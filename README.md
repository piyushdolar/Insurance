## QUICK START - BETA Version

### Install dependencies

`npm install`

### Serve with hot reload at localhost:8080

`npm run dev`

### Build for production with minification

`npm run build`

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Documentation

The documentation for the Vue Material Dashboard is hosted at our [website](https://demos.creative-tim.com/vue-material-dashboard/documentation).

## File Structure

Within the download you'll find the following directories and files:

```
Insurance
├── README.md
├── babel.config.js
├── vue.config.js
├── db_insurance.sql
├── package.json
├── postcss.config.js
├── public
│   └── index.html
│   └── favicon.png
│   └── images
└── src
    ├── App.vue
    ├── material.js
    ├── globalComponents.js
    ├── globalDirectives.js
    ├── main.js
    ├── material-dashboard.js
    ├── api
    │   └── config.js
    ├── mixins
    │   ├── Policies.js
    │   └── VuetableMixin.js
    ├── assets
    │   ├── github
    │   ├── img
    │   └── scss
    │       ├── material-dashboard.scss
    │       └── md
    ├── components
    │   ├── Cards
    │   │   ├── ChartCard.vue
    │   │   ├── NavTabsCard.vue
    │   │   └── StatsCard.vue
    │   ├── NotificationPlugin
    │   │   ├── Notification.vue
    │   │   ├── Notifications.vue
    │   │   └── index.js
    │   ├── SidebarPlugin
    │   │   ├── SideBar.vue
    │   │   ├── SidebarLink.vue
    │   │   └── index.js
    │   ├── Tables
    │   │   ├── NavTabsTable.vue
    │   │   ├── OrderedTable.vue
    │   │   └── SimpleTable.vue
    │   ├── Dropdown.vue
    │   ├── AlertBox.vue
    │   └── index.js
    ├── store
    │   ├── modules
    │   │   ├── agents.store.js
    │   │   ├── dashboard.store.js
    │   │   ├── global.store.js
    │   │   ├── login.store.js
    │   │   ├── policies.store.js
    │   │   ├── policyHolders.store.js
    │   │   └── users.store.js
    │   └── index.js
    ├── pages
    │   ├── Layout
    │   │   ├── Content.vue
    │   │   ├── ContentFooter.vue
    │   │   ├── DashboardLayout.vue
    │   │   ├── MobileMenu.vue
    │   │   └── TopNavbar.vue
    │   ├── UserProfile
    │   │   ├── EditProfileForm.vue
    │   │   └── UserCard.vue
    │   ├── UserProfile.vue
    │   ├── Dashboard.vue
    │   ├── Maps.vue
    │   ├── Agents.vue
    │   ├── Changelogs.vue
    │   ├── index.js
    │   ├── Login.vue
    │   ├── Logout.vue
    │   ├── MyProfile.vue
    │   ├── Policies.vue
    │   ├── PolicyHolders.vue
    │   ├── Users.vue
    │   └── index.js
    └── routes
        └── routes.js
```

## Change logs:

## [1.26.*] 2020-01-\*

### Minor changes

-   After login redirect to dashboard token wasn't updated bug fixed.
-   API Authorization updated.

## [1.26.9] 2020-01-24

### What's new

-   Policy's specific user-profile display with a popup box.
-   Manage users with edit options has finished development.
-   Filter for policies.
-   Specific user profile on navbar added.
-   Policy's table name column on click show particular detail popup box added.
-   Added Edit section for User/Agent/Policy profile.
-   Added change status field for User/Agent/Customers.
-   Added Vue Chips to vuetable for easy recognition.
-   Notification CSS updated position fixed if a user is on anywhere in the page it'll still show to them.
-   The download CSV file for users database/table it also can be opened with excel.
-   New Scrollbar design added relative to dashboard theme.

### Bugs/Fixes

-   Profile page on page change not getting data from API, but on refresh can.
-   Dashboard User Count including the current user.
-   Image not appearing on the server problem fixed.
-   Dashboard user count including master admin fixed.
-   Profile picture alt attribute name didn't appear when it could find a resource in the server.
-   Dialog box not scrolling on small devices issue has been fixed now.
-   CSV files column name bug fixed Title to phone.
-   When creating the Policy for customer/policyholder it's got accepted by default bug fixed.
-   User/Agent/Customer, Policy - While creating a profile is created in the database when image error still exists.

## [1.15.0] 2020-01-18

### Bugs/Fixes

-   Users table edited by whom. history added.
-   Users validation for password fixed.
-   Users button name not changing for update.
-   Users phone number validation fixed.
-   Users modal close only after it's successfully created fixed.
-   Vuetable "Object not defined" while empty search in database fixed.
-   Users folder directory changed avatars/ to avatars/users and same as with rest of users agents and customers/policy holders.
-   Users/Agents/Customers gender selection bug fixed.
-   Tabs Home,Users,Agent's Information, Policy Holders successfully added.
-   Policy API established.
-   Policy Features like filter, auto select added.
-   Some extra features and bugs fixed and updated.
-   Image problem resolved(image not shown on server route but in local can)
-   Dashboard chart fixed which was not showing data on page refresh but showing on component load only.
-   Datatable error fixed for searching with any users/agents/customers.
-   Users filter table added the loading wait while creating or editing users.
-   LoggedIn user profile component updated, user now can able to change profile section.

### Known Bugs/Changes/Update

-   Images are not updating right now because of server issue sometime not rendering properly will be fixed on next update.
-   Filter for polices.
-   Profile page on page change not getting data from API, but on refresh can.
-   Dashboard User Count including current user.

### In Development

-   Specific User Profile.
-   Policies table on click on particular username open the agent and user profile.
-   Edit the current user profile.
-   Policies table Filter integration.
-   Login middleware.

## [1.8.0] 2020-01-14

### Changes/Fixes

-   Login page notification added.
-   Users table bugs fixed for email API as well profile picture.
-   After login dashboard API was not able to fetch the instance token.

## [1.7.0] 2020-01-10

### Changes

-   Datatable Searchbar, Pagination, Per-page dropdown with REST APIs sync added.
-   Dashboard sidebar naming change.

## [1.6.0] 2020-01-07

### Dependencies Updates, Design enhancement.

-   Updated all out of date dependencies from `package.json` file
-   Updated dashboard which we discussed yesterday.
-   Users datatable with filter design updated.

## [1.5.1] 2020-01-06

### Dependencies Updates

-   Updated all out of date dependencies from `package.json` file
-   Added vuetable 2 for datatable feature for multi filter options as a demo usage right now.
-   Rest api setup with live data changes on datatable.

## [1.4.8] 2019-12-30

### Dependencies Updates

-   Updated all out of date dependencies from `package.json` file
-   Added customers layout design and create new customer design layout
-   Added contract design with create contract support

## [1.3.2] 2019-12-28

### Dependencies Updates, Vue Material Update

-   Updated all out of date dependencies from `package.json` file
-   Added agents pages design and create agent design
-   Added admin users design and create users design

## [1.2.0] 2019-12-27

### Dependencies Updates and BugFixing

-   Updated all out of date dependencies from `package.json` file
-   Updated all the npm packages
-   Scroll issue on mobile devices fixed
-   Another small bug fixes

## [1.0.0] 2019-12-26

-   Initial Release

## Browser Support

At present, we officially aim to support the last two versions of the following browsers:

<img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/chrome.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/firefox.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/edge.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/safari.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/opera.png" width="64" height="64">

## Technical Support or Questions

If you have questions or need help integrating the product please [contact us](#) instead of opening an issue.
