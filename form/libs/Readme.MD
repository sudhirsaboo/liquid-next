TextArea has it value stored in state as ReactToolbox  need to provide getValue() function for it to work as EntryField

Note TextArea is using RTB Input vs EntryField is using HTML input


getStoreValue -> From DB initial state
getInputValue
getFieldValue Object {name: value} calls getInputvalue to get raw value.
getSubmitValue == getInputValue


TextArea onBlur it calls apply on parent.
TextArea on change is called first then onblur
Checkbox 
    onblur is called first then onchange.
    https://github.com/javivelasco/react-css-themr/blob/8d12cfdca26c141c549a85e8e3065c45b83be654/README.md
    return this.refs.input.refs.input.inputNode.checked
    //not getting fro state as it can have unchanged value. if this is called before handleChange
    // the alternative would be to return state value but ensure handlechange is called before onblur
    
    ## Could do it like this but chose not to.
      getInputValue() {
            return this.refs.input['refs'].input.inputNode.checked; // Get from the themed innerRef
           // return this.state.value; // It would be good if it can get it from RTB refs directly
        }
         <MDCheckBox
                                      ref="input"
                                      innerRef="input"

