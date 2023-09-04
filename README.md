# Frontier Simple Valet App

This is a simple tool to allow Valets to more easily do their job on the Frontier server, making tracking existing ships, dock timers and fine issued / to be issued trivial.

It is mostly meant to be a temporary solution i had made myself so as to make my life easier, awaiting i someday try to make it a PDA program, so don't expect much changes to this, and for it to stay barebones (hence the poor code quality).


To run it either clone the repo and run `npm start` if you have npm installed

You can also run `npm run build` to compile it to a vanilla website, and can run it by simply opening the html file.

If you do not have npm installed, or just want to run it, you can download the release build and simply open the html file contained at the root.

---

The data is stored locally in the cache, moving the file around or clearing the cache will result in loss of data.

However, as it is stored locally it can be recovered if the window / browser is closed.

It does mean you must manually remove entries at the end of shifts.

---

No actual tutorial, but here's the basic idea :

In the top left hand corner are two forms,

- the top one is to input a new ship into the system,
  - The captains name is optional and can be added later, it merely exists to help know who to fine
  - Ship dock timer is also optional, just in case a ship has already been docked for a bit when inputting into the system, so that they aren't given 'free time'


- The form below allows to input how a fine is calculated, so that you don't have to do the math yourself.
  - Base fine : Static number for the fine, to which incremental fines can be added
  - Minimum fine : Guarantees a minimum (For exemple, 1K/min overstayed with minimum of 5k)
  - Fine increment : How much the fine goes up every interval
  - How often the fine increments (In minutes)

  - How long ships may dock for before being fined

  - A file selector to pick an audio file which will play when a ship has overdocked (Must be selected again on reload due to security restrictions)

---

Top right hand corner, contains all currently docked shiped, showing the oldest in priority


- Displays:
    - How long the ship has been docked for
    - The ships name
    - Its callsign
    - The captains name (To know who to fine)
    - The amount of the fine
    - An undock button to signal that the ship has left the station

---

Bottom half displays every registered ship, and contains similar information as well as :

- Posed threat, if you ever need to track how dangerous a ship is (Pirates trying to sneakily dock)
- When the ship last docked
- Their unpaid fines, if any
- Buttons to mark the ship as docked/undocked
- Buttons to edit the threat level
- Button to remove a ships outstanding fines (assuming they paid them off)
- A button to remove the ship from the records (sold)