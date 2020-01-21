# Simple eShop

Training project. Powered by [iTechArt](https://itechart.by) Students Lab 2019

https://simple-e-shop.herokuapp.com/

## Installation

To install both client and server dependecies run:

```bash
yarn install && yarn --cwd client install
```

## Usage

Run this to start client and server development modes in a single thread:

```bash
yarn dev
```

Alternatively you can separately run client development mode:

```bash
yarn client
```

And server development mode:

```bash
yarn server
```

Be sure to add .env file with settings to the root. Put the path to your local or cloud mongodb database in 'MONGO_URI' key.
