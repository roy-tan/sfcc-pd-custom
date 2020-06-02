(() => {
    var rootEditorElement;
    /**
     * initializes the base markup before page is ready. This is not part of the API, and called explicitely at the end of this module.
     */
    function init() {
      rootEditorElement = document.createElement('div');
      rootEditorElement.innerHTML = `
      <div class="slds-radio_button-group">
        <span class="slds-button slds-radio_button">
          <input type="radio" name="displayFormat" id="gridCol-2" value="6" />
          <label class="slds-radio_button__label" for="gridCol-2">
            <span class="slds-radio_faux">2</span>
          </label>
        </span>
        <span class="slds-button slds-radio_button">
          <input type="radio" name="displayFormat" id="gridCol-3" value="4" />
          <label class="slds-radio_button__label" for="gridCol-3">
            <span class="slds-radio_faux">3</span>
          </label>
        </span>        
        <span class="slds-button slds-radio_button">
          <input type="radio" name="displayFormat" id="gridCol-4" value="3" />
          <label class="slds-radio_button__label" for="gridCol-4">
            <span class="slds-radio_faux">4</span>
          </label>
        </span>
        <span class="slds-button slds-radio_button">
          <input type="radio" name="displayFormat" id="gridCol-6" value="2" />
          <label class="slds-radio_button__label" for="gridCol-6">
            <span class="slds-radio_faux">6</span>
          </label>
        </span>        
      </div>
        `;
      document.body.appendChild(rootEditorElement);
    };
  
    /** the page designer signals readiness to show this editor and provides an optionally pre selected value */
    listen('sfcc:ready', async ({ value, config, isDisabled, isRequired, dataLocale, displayLocale }) => {
      const selectedValue = typeof value === 'object' && value !== null && typeof value.value === 'string' ? value.value : null;
      // if nothing was preselected we ask the user to select 
      var gridColSelector = '#gridCol-4';
      switch(selectedValue) {
        case "2":
          gridColSelector = '#gridCol-6';
          break;
        case "3":
          gridColSelector = '#gridCol-4';
          break;
        case "4":
          gridColSelector = '#gridCol-3';
          break;          
        case "6":
          gridColSelector = '#gridCol-6';
          break;        
      }
      rootEditorElement.querySelector(gridColSelector).checked = true;      
  
      // Change listener will inform page designer about currently selected value
      const inputs = rootEditorElement.querySelectorAll('input[name="displayFormat"]');
      Array.from(inputs).forEach(input => input.addEventListener('change', event => {
        const selectedValue = event.target.value;
        console.log("selectedValue:", selectedValue);
        emit({
          type: 'sfcc:value',
          payload: selectedValue ? { value: selectedValue } : null
        });
      }));
    });
  
    // When a value was selected
    listen('sfcc:value', value => { });
    // When the editor must require the user to select something
    listen('sfcc:required', value => { });
    // When the editor is asked to disable its controls
    listen('sfcc:disabled', value => {
      if (rootEditorElement) {
        rootEditorElement.querySelector('.btn-group').disabled = true;
      }
    });
  
    init();
  
  })();