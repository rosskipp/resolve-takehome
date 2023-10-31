# Resolve Takehome

Requirements:

Backend:

- Build a javascript API service that returns property data for a specific entity id.
- The API queries the SQLite file below to get info about the provided entity id.
- When a request comes in it should check if the SQLite file is already locally stored and if it isn't it needs to download the SQLite file, then query against it.
- The API accepts requests with specific entity id's and return the data for requested entities.
- Why download the file it instead of just having it hosted in this repo? We fetch files like this for every model because they're unique and come from 3rd party sources. So we want to see how you'd tackle this.

Frontend:

- Build a client that requests and displays property data from #1.
- The client should be a React app that accepts an entity id as input, sends a request to the service, and displays the resulting properties in a way the user can explore.
- The most important requirement is that it displays the data in a format similar to the image above (not in 3D) - the name of the selected element should be explicitly stated and properties should be grouped by category.
- Categories should be collapsible and expandable when the user clicks on them.
- The client should not be part of the same app/process running the code in #1. We want to see how you make things talk to each other.

Provide a video demo of your code working and a link to the code for us to review.
