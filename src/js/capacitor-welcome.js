import { SplashScreen } from '@capacitor/splash-screen';
import { Camera } from '@capacitor/camera';
import { registerPlugin } from '@capacitor/core';

const Navigation = registerPlugin('CapacitorMapboxNavigation');


window.customElements.define(
  'capacitor-welcome',
  class extends HTMLElement {
    constructor() {
      super();

      SplashScreen.hide();

      const root = this.attachShadow({ mode: 'open' });

      root.innerHTML = `
    <style>
      :host {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        display: block;
        width: 100%;
        height: 100%;
      }
      h1, h2, h3, h4, h5 {
        text-transform: uppercase;
      }
      .button {
        display: inline-block;
        padding: 10px;
        background-color: #73B5F6;
        color: #fff;
        font-size: 0.9em;
        border: 0;
        border-radius: 3px;
        text-decoration: none;
        cursor: pointer;
      }
      main {
        padding: 15px;
      }
      main hr { height: 1px; background-color: #eee; border: 0; }
      main h1 {
        font-size: 1.4em;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      main h2 {
        font-size: 1.1em;
      }
      main h3 {
        font-size: 0.9em;
      }
      main p {
        color: #333;
      }
      main pre {
        white-space: pre-line;
      }
      label {
        width:180px;
        clear:left;
        text-align:left;
        padding-right:10px;
    }
    
    input, label {
        float:left;
    }
      
   </style>
    <div>
      <capacitor-welcome-titlebar>
        <h1>DRIFTER NAVIGATION MODULE</h1>
      </capacitor-welcome-titlebar>
      <main>
        <p>
          Latitude,Longitude formatında girilen başlangıç ve hedef noktaları arasında navigasyon başlatır.Navigasyon verileri Drifter a aktarılır.
        </p>
        <h2>START NAVIGATION</h2>
        <p>
         Konum izninizi kontrol ediniz.
        </p>

        <label for="navigatePointStart">Başlangıç: </label>
        <input type="text" id="navigatePointStart" name="baslangic" value="40.773863,29.400298"/>
        <br><br/>
        <label for="navigatePointEnd">Hedef: </label>
        <input type="text" id="navigatePointEnd" name="hedef" value="41.09307,28.80203" />
        <br><br/>
        <button class="button" id="navigate">Navigate</button>
        <p>
          <img id="image" style="max-width: 100%">
        </p>
      </main>
    </div>
    `;
    }

    connectedCallback() {
      const self = this;



      self.shadowRoot.querySelector('#navigate').addEventListener('click', async function (e) {
        try {

          const callbackId = await Navigation.show({ valueKey: "pk.eyJ1IjoiZmF0aWhhbHAiLCJhIjoiY2pkYzZhb3N1MGR0YjJ4bm9lMzNwdWliZyJ9.WcqDfiRByPFDgz5SunBUKg", valueS: "40.773863,29.400298", valueE: "41.09307,28.80203" }, (response) => {

            console.log("Response from Code " + response.navigationstatus)

          });


          console.log('Response from native:', callbackId);

        } catch (e) {
          console.warn('Error Occured', e);
        }
      });
    }
  }
);

window.customElements.define(
  'capacitor-welcome-titlebar',
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `
    <style>
      :host {
        position: relative;
        display: block;
        padding: 15px 15px 15px 15px;
        text-align: center;
        background-color: #73B5F6;
      }
      ::slotted(h1) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 0.9em;
        font-weight: 600;
        color: #fff;
      }
    </style>
    <slot></slot>
    `;
    }
  }
);
