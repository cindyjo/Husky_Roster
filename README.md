# 2015 Huskies Football Roster

An app manages Huskies Football Roster. A husky football player can be added, updated, and deleted utilizing all 4 CRUD methods with Mongoose.

## Routes to build this app:

- GET '/' Displays all of the players.
- GET '/mongooses/:id' Displays information about one player.
- GET '/mongooses/new' Displays a form for making a new player.
- POST '/mongooses' The action attribute for the form in the above route (GET '/mongooses/new').
- GET '/mongooses/:id/edit' Shows a form to edit an existing player.
- POST '/mongooses/:id' The action attribute for the form in the above route (GET '/mongooses/:id/edit').
- POST '/mongooses/:id/destroy' Deletes the player from the database by ID.
