# MongoDB Database Application with Mongoose

## Contents

- [Description](#description)
- [Base URL](#base-url)
- [Endpoints](#endpoints)
  - [Parameters](#parameters)
  - [Response Properties](#response-properties)
- [Demo](#demo)
  - [Example](#example)
  - [Response](#response)
- [Errors](#errors)
  - [Incorrect Endpoint](#incorrect-endpoint)
- [Webpage](#web-page)
- [Author](#author)

## Description

This is an api to fetch Spotify top 100 songs.

## Base URL

The base URL for all API requests is:

```sh
http://localhost:3000/
```

### Endpoints

```js
GET / songs;
GET / songs / id;
```

Returns the collection of 100 most popular songs on Spotify.

```js
GET / artists;
GET / artists / id;
```

Returns the collection of 100 most popular songs on Spotify by artists.

```js
GET / stats;
GET / stats / id;
```

Returns the collection of 100 most popular songs including their respective play counts measured in billions.

### Parameters

```sh
limit (optional)
```

The maximum number of songs to return. Default is 100.

### Response Properties

Returns a JSON object depending on the endpoint. The following are the available properties:

```sh
http://localhost:3000/songs
```

<li>id: The unique song ID.
<li>rank: The Spotify rank of the song.
<li>title: The title of the song.
<li>releaseDate: The release date of the song.
<li>artist: The artist behind the song.
<p>&nbsp;</p>
<p>&nbsp;</p>

```sh
http://localhost:3000/artists
```

<li>id: The unique artist ID.
<li>artist: The artist or group of artists behind the song.
<li>rank: The Spotify rank of the song.
<p>&nbsp</p>
<p>&nbsp</p>

```sh
http://localhost:3000/stats
```

<li>id: The unique stat ID of the song.
<li>statsCount: The play count on Spotify measured in billion.
<li>title: The title of the song.
<li>artist: The artist behind the song.

## Demo

### Example

Request:

```sh
GET /http://localhost:3000/songs?limit-1
```

### Response

```json
{
  "song": [
    {
      "id": "015E7B62",
      "rank": 1,
      "title": "Blinding Lights",
      "releaseDate": "29 November 2019",
      "artist": "The Weeknd"
    }
  ]
}
```

## Errors

This API uses the following error codes:

<li> 404 Not Found: The requested resource was not found.
<li> 500 Internal Server Error: An unexpected error occurred on the server.

### Incorrect Endpoint

When the endpoint or URL is incorrect, the API doc will be rendered for the user.

Example: 'song' instead of 'songs'

```url
http://localhost:3000/song
```

## Web Page

### Base URL Screenshot

![Base URL screenshot](/public/webpage.png)

## Author

Christian Samson
