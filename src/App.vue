<template>
  <router-view />
</template>

<style lang="scss">

$red: rgb(192, 11, 11);
$red-dark: rgb(142, 11, 11);
$grey: rgb(48, 43, 43);

@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@900&family=Open+Sans:wght@400;800&display=swap');

html, body {
  background: $grey;
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
}

h1, h2 {
  font-family: 'Archivo', sans-serif;
  font-weight: 900;
}


a {
  &.button {
    background-color: $red;
    color: white;
    display: inline-block;
    text-transform: uppercase;
    padding: .5rem 1rem;
    text-align: center;
    text-decoration: none;
    border-radius: 2rem;
    font-weight: 800;
    transition: background-color .25s ease-in-out;
    &:hover {
      background-color: $red-dark;
    }
  }
}
</style>
