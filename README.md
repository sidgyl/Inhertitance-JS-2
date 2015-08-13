1. Write a JavaScript program to maintain a set of boxes (like lab 3) whose properties may be inherited prototypically from their ancestors in the containment hierarchy:

a. While in “rectangle” (e.g. drawing) mode, there will be an additional “Inherit” radio-box option for each of “Fill Color”, “Stroke Color”, and “Stroke Thickness” to indicate that a box should prototypically inherit the property from its parent in the containment hierarchy. The inheritance for the property may be for an arbitrary number of levels through the prototype chain.

When “rectangle” mode is left, the radio-box options are “cut”.

b. While in “selection” mode, the radio boxes (for the three box properties) should be disabled. As the smallest containing box changes, the radio boxes should indicate the properties of the highlighted box.
If the user clicks (on the canvas) while in this mode, the properties of the selected box are “cut”. (An alert is useful while debugging.) When a transition to “rectangle” or “set properties” mode is made, the radio boxes should be “pasted” (set) to the most recently cut properties and enabled.

c. The new “set properties” mode:

1. Highlights the containing box of the mouse position - like “selection” mode.

2. Keeps the radio boxes (for the three box properties) enabled and changeable only by the user (not by mouse
moves).

3. Reacts to a mouseclick by changing the properties of the containing box (to those indicated by the radio buttons).

If a property has the “Inherit” radio button indicated, the containing box will now inherit from its immediately
containing box. (JavaScript delete for a property should be used.) 4. When “set properties” mode is left, the radio-box options are “cut”.
