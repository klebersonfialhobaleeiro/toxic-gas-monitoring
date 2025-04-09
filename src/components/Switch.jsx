import React, { useRef, useEffect } from 'react';
import switcher from './../assets/chama.svg';
import { database as db } from './../utils/firebase';
import { onValue, ref, set } from 'firebase/database';

import './Switch.scss';

function Switch() {
  const valorAtual = useRef();

  useEffect(() => {
    onValue(ref(db, "/sensores/chama"), (snapshot) => {
      const value = snapshot.val();

      if (valorAtual.current) {
        console.log(value);
        valorAtual.current.checked = value === 0 ? 1 : 0;
      }
    });
  }, []);



  return (
    <form action="" id="led-form">
      <ul id="led_list">
        <li className="field">
          <div className="wrapper">
            <input
              type="checkbox"
              name="led__state"
              id="blue_led"
              ref={valorAtual}
              disabled
            />
            <div className="field__image" data-led="orange">
              <img src={switcher} className="led__icon" alt="green_led-icon" />
            </div>
          </div>
          <label htmlFor="blue_led" className="led__name">
            Chamas
          </label>
        </li>
      </ul>
    </form>
  );
}

export default Switch;
