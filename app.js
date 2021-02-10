/*
*  call to CloudFormation createStack API 
*/


/*
*  react-js code for rendering index.html begins
*/

'use strict'; 
const e = React.createElement; 
const tabs = ["Setup", "Update", "Delete", "Instructions", "Contact Us"];
const regions = ["Select Region", "us-east-1", "us-east-2"];

class TabNav extends React.Component{
    render(){
        return (
            e('div', {className: 'nav flex-column nav-pills', id: 'nav-tab'}, [
                e('div', {className : "sidebar-header", key: "sidebar-header"}, [e('h3', {key: 1}, "OneApp"), e('h3', {key:2}, "Provisioning")]),
                e('ul',{key : 'navbar'}, this.props.tabs.map(tab => {
                    const active = (tab === this.props.selected ? 'active' : '');
                    return e('li', {className: "nav-item", key: tab}, 
                        e('a', {className: "nav-link " + active, onClick: () => this.props.setSelected(tab)}, tab));
                }))
            ])
        );
    }
}

const Sidebar = props => {
    return e('div', {className : 'col-sm-3 full-height'},e(TabNav, {tabs: props.tabs, selected: props.selected, setSelected: props.setSelected}));
};

class Tab extends React.Component{
    render(){
        if(this.props.isSelected){
            return e('div', {className: "tab-pane"}, this.props.children);
        }
        return null;
    }
}

function setButtonDisabled(id, disabled = true, value = "Start Setup"){
    document.getElementById(id).disabled = disabled; 
    document.getElementById(id).innerHTML = value;
}

const TabContents = props =>{
    return e('div', {className: "col-md-9 tab"}, [
                // Setup Tab Content
                e(Tab, {key:"setup-tab", isSelected: props.selected === "Setup"}, ([
                    e('div', {key: 1, className: "tab-content-row"}, [
                        e('input', {key: "access-key-id",type: "text", id: "access-key-id", autoFocus: true, required: true, className: "form-outline"}),
                        e('label', {key: "access-key-id-label", id: "access-key-id-label",className: "form-label"}, "Access Key Id")
                    ]),
                    e('div', {key: 2, className: "tab-content-row"}, [ 
                        e('input', {key: "secret-access-key", type: "text", id: "secret-access-key", autoFocus: true, required: true }),
                        e('label', {key: "secret-access-key-label", id: "key-label",className: "form-label"}, "Secret Access Key")
                    ]),
                    e('div', {key: 3, className: "tab-content-row"}, [
                        e('select', {key: "region",name: "region", id: "region", autoFocus: true, defaultValue: "Select Region"},  regions.map(region =>{
                                if(region === "Select Region"){
                                    return e('option', {key: region, value: region, disabled: true}, region);
                                }
                                return e('option', {key: region, value: region}, region);
                            })
                        ),
                        e('label', {key: "region-label", id: "region-label",className: "form-label"}, "Region")
                    ]),
                    e('div', {key: 4, className: "tab-content-row"}, 
                        e('button', 
                            {key: "setup-btn", className: "btn btn-dark", id: "setup-btn", 
                            onClick: ()=>{setButtonDisabled("setup-btn", true, "Setup in progress...")}}, 
                       "Start Setup"))]
                )),
                
                //Update Tab Content
                e(Tab,{key:"update-tab", isSelected: props.selected === "Update"}, 
                    e('div',{className: "tab-content-row"}, e('h3',{},"Update Page Coming soon..."))
                ),

                //Delete Tab Content
                e(Tab,{key:"delete-tab", isSelected: props.selected === "Delete"}, 
                    e('div',{className: "tab-content-row"}, e('h3',{},"Delete Page Coming soon..."))
                ),

                // Instructions Tab Content
                e(Tab,{key:"instructions-tab", isSelected: props.selected === "Instructions"}, 
                    e('div',{className: "tab-content-row"}, e('h3',{},"Instructions Page Coming soon..."))
                ),

                // Contact Us Tab Content
                e(Tab,{key:"contacts-us-tab", isSelected: props.selected === "Contact Us"}, 
                    e('div',{className: "tab-content-row"}, e('h3',{},"Contact Us Page Coming soon..."))
                )
            ]);    
};


class App extends React.Component{
    constructor(){
        super()
        this.state = { selected : 'Setup'}
    }
    setSelected(tabName){
        console.log(tabName);
        this.setState({selected: tabName});
    }
    render(){
        return e('div', 
                {className: 'row'},
                [
                    e(Sidebar, {key: "SideBar", tabs: tabs, setSelected: this.setSelected.bind(this), selected: this.state.selected}, null),
                    e(TabContents, {key: "Content", selected: this.state.selected}, null)
                ]);
    }
}

ReactDOM.render(e(App), document.getElementById('content'));

