# prem-assignment

Important notes:

Feel free to ask many questions.

Use the private github repo I provided

Do frequent commits even if the code is not working.

Do not share the problem on your public repos

Problem 1:

Build a table in JS/HTML that looks like this:
https://docs.google.com/document/d/1tlV9do4LZkXzbB3psfPra3dSa0UoNsp5zJ3qvLZB7kA/edit?usp=sharing

Use different header names for the columns.

The 3+3 buttons do this:
Move the view forward/backward by one row, one page or go to the last page. Number of rows is controlled by the "showing" X rows. If that is changed the number of rows on the page changes . Assume max value = 10000 for this field.

Starting at ROW Y means the first row being shown is of index Y. Eg: if you go to next page Y will become 11, if you manually change Y = 23, then the view will move to that index as the first row in your view.

Create some array of arrays / table in your JS as your underlying data source.
Generate 'rows out of' count of random rows of data. If that input/number is changed by the user - you will have to regenerate the data. Default value is - 1,000,000. It can even be higher. Do not worry about optimization etc. This is a client side exercise only.
(in real life this data will come from some server's REST api, do not worry about pagination etc problems)

Assume that the max rows shown on a page is 10000.
Constraints:
Try using a small vdom library called mithril.js to write your components.
Can use https://mithril.js.org/hyperscript.html instead of JSX syntax.
For CSS use tachyons or tailwindcss.
