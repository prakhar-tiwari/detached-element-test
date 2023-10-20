import { useEffect, useRef, useState } from 'react';
import './App.css';
import "@momentum-ui/web-components";
import LogRocket from 'logrocket';

export const comboBoxOptions = [
  "Afghanistan",
  "Aland Islands",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda Antigua and Barbuda Antigua and Barbuda",
  "Argentina"
];

function App() {
  const [isStationLoginModal, setIsStationLoginModal] = useState(false)
  const [isExtensionTooltipOpened, setIsExtensionTooltipOpened] = useState(false)
  const modalRef = useRef(null);
  const inputRef = useRef(null)
  useEffect(() => {
    const modalElem = modalRef?.current;
    if (modalElem) {
      modalElem.addEventListener('close-modal', closeStationLogin);
    }
    return () => {
      if (modalElem) {
        modalElem.removeEventListener('close-modal', closeStationLogin);
      }
    };
  }, [])
  const openStationLogin = () => {
    setIsStationLoginModal(prevState => !prevState)
  }

  const closeStationLogin = () => {
    setIsStationLoginModal(false)
    document.dispatchEvent(new CustomEvent("on-widget-update"))
  }

  const handleInputChange = () => {
    if (this.dialInput) {
      inputRef.current?.dispatchEvent(
        new CustomEvent("focus-visible", {
          composed: true,
          bubbles: true
        })
      );
    }
  };

  return (
    <div className="App">
      <md-button onClick={openStationLogin}>Open Station Login Modal</md-button>
      {isStationLoginModal && <md-button>Test button</md-button>}
      <md-modal size="dialog" ref={modalRef} {...(isStationLoginModal ? { show: true } : '')} closeBtnName="Submit This">
      <md-form form-submitted={() => console.info("Form Submitted!!!")} is-valid>
          <md-tabs justified>
            <md-tab slot="tab" label="Dial Number">
              <span>Dial Number</span>
            </md-tab>
            <md-tab-panel slot="panel">
              <div className="phone-fromat">
                <md-radiogroup group-label="phone-fromat" alignment="horizontal" checked="0">
                  <md-radio slot="radio" value="US" aria-label="US Format">US Format</md-radio>
                  <md-radio slot="radio" value="Other" ariaLabel="Other">Other</md-radio>
                </md-radiogroup>
              </div>

              <md-input
                ref={inputRef}
                type="tel"
                id="dn"
                className="dial-number"
                placeholder="Dial Number"
                shape="pill"
                autofocus
                clear
                input-change={handleInputChange}
              ></md-input>
            </md-tab-panel>
            <md-tab slot="tab" label="Extension">
              <span>Extension</span>
            </md-tab>
            <md-tab-panel slot="panel">
              <div className="extension-format">
                <md-input aria-label="Team X" type="tel" id="ext" placeholder="Team X" shape="pill"></md-input>
              </div>
              <md-combobox placeholder="Choose Team" options={JSON.stringify(comboBoxOptions)}></md-combobox>
            </md-tab-panel>
          </md-tabs>
        </md-form>
      <md-combobox with-custom-content>
            <div slot="one" aria-label="Facebook" display-value="Facebook">
              <span>Facebook</span>
              <md-icon name="icon-facebook_16"></md-icon>
            </div>
            <div slot="two" aria-label="Twitter" display-value="Twitter">
              <span className="company-value">Twitter</span>
              <md-icon name="icon-twitter_16"></md-icon>
            </div>
            <div slot="three" aria-label="Wikipedia" display-value="Wikipedia">
              <span className="company-value">Wikipedia</span>
              <md-icon name="icon-wikipedia_16"></md-icon>
            </div>
            <div slot="four" aria-label="Google" display-value="Google">
              <span className="company-value">Google</span>
              <md-icon name="icon-google_16"></md-icon>
            </div>
          </md-combobox>
      <md-menu-overlay size="large">
        <md-button slot="menu-trigger" variant="primary">Open Menu Overlay</md-button>
        <div style={{padding:"1.25rem", width: "100%"}}>
          <md-input htmlId="inputSearchClearPill" containerSize="small-12" placeholder="Enter Text" shape="pill" clear>
          </md-input>
          <md-checkbox>Default Checkbox</md-checkbox>
          <md-checkbox checked>Default Checked Checkbox</md-checkbox>
          <md-checkbox indeterminate>Default Indeterminate Checkbox</md-checkbox>
          <div style={{textAlign: "center"}}>
            <p style={{marginBottom: ".5rem"}}>Please complete the entire form</p>
            <md-button variant="primary">Submit</md-button>
          </div>
        </div>
      </md-menu-overlay>
      </md-modal>
    </div>
  );
}

export default App;
