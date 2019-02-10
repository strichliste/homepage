+++
date = "2015-07-11T20:23:21+02:00"
draft = false
title = "What is this project about?"
[menu]
  [menu.main]
    parent = "About"
+++

<quote>
_strichliste_ ([ʃtʀɪçˈlɪstə], German word for tally sheet) is a tool to replace a tally sheet inside a hackerspace. 
It's aim is to provide a no-frills, easy-to-setup and -to-use solution for managing your organization's snack bar.
</quote>

### Demo

That's what you're here for, right? You can access a demo of strichliste
[here](https://demo.strichliste.org/). But, just to be sure, here's how
it looks like:

<img alt="A screenshot of strichliste in action" src="/img/screenshot-main.png" width="1224" height="620">

### Architecture

strichliste consists of two components: the `frontend` and the `backend`.

The frontend [strichliste](https://github.com/strichliste/strichliste) is an react based
application that accesses the backend via a RESTful HTTP interface.

The [backend](https://github.com/strichliste/strichliste-backend) is written in PHP using the symfony web framework.
All data is writting into a database. By default it utilises a SQLite database, but can be changed
easily thanks to the Doctrine ORM

### How it works

The processes implemented by strichliste inherently assumes to be used by a
trusted audience. Each user intending to buy something from your kiosk is
required to have a user account with strichliste. This can be done by
registering your username (no other data is required).

Once an account is available, the user can simply deducting the value from their account, or buy
articles from the article database. Administrators of strichliste
can define a lower or upper bound for the users' credit balance. For example,
administrators can configure that it is not allowed to have a negative balance.

Cashing your account works the same as the inverse of buying an item: Simply
charge your account with the given amount and it will take effect immediately.

Also strichliste supports transactions. You can easily send money to another account
and add a comment to store the purpose.

### Barcode Scanner

If you add a Barcode to your article database, you can use a simple USB/Serial/Bluetooth Barcode scanner to
buy articles. Just go to your users page, pick up the barcode scanner and scan your favorite drink/snack.

### Troubleshooting

In case of problems, please file an issue on our Github issue tracker.
