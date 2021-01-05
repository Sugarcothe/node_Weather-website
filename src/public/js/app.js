console.log(`client side, javascript file is loaded`)

fetch(`http://puzzle.mead.io/puzzle`).then((response) => {
  response.json().then{(data) => {
      console.log(data)
  }}
})

fetch(`http://http://localhost:3000/weather?address=boston`).then(() => {
  re
})