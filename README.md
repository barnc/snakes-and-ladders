# Summary

This is a the bare bones of a snakes and ladders game model written in Typescript.

The game state is seeded via config in `index.ts`. Snakes and ladders are added according to the usual rules (snakes going down 1+ rows, ladders going up 1+ rows), and a game loop is entered prompting the user to role the dice and advancing the turn order.

The game ends when a player reaches the final square, and they are bounced back if they roll past the last square (these were my house rules anyway, so I modified this!).

# To Run
`npm run start`

# To Build
Make sure you have typescript installed locally, and run `tsc -w` in your root folder.


# Design choices

I have chosen to store the squares in a multidimensional array, rather than a flat array. This is because this is meant to represent a game, and in games programming you would generally want to give a class or entity everything it needs to render itself, i.e. it's position in the game world. 

This adds some complexity to the code at the cost of making our API nicer to interact with, and making rules such as "ladders must go up to at least the next row" easy to implement. If we wanted to create "snakes and ladders and wormholes" to differentiate ourselves in the crowded board game market, we can also easily add new rules based on grid positions, rather than having to juggle indexes.

I have omitted tests due to the time constraints of this - though for an example of what we might test:

- Test the game initialisation: create some dummy configurations, and assert the player counts are correct, player locations are the start square, etc.

- Unit test methods for returning square indexes based on grid positions at different grid sizes etc.

- Test player movement by comparing start / end squares.

- Failure case tests - test that edge cases are captured e.g. loading 1,000 ladders into a 100 square board.

- Test player turn order - check index advances & loops correctly

- Test win conditions - check game ends if a player moves to the last square.


# Unimplemented Features

- Rolling to see who goes first - would just be a case of prompting die rolls, storing them against a player, filtering the highest roll players, and looping through this process until there is a single player remaining.

- Computer controlled characters - Would just be a case of skipping the prompts unless player index is 0.

- Making sure game is winnable: Currently it would be possible to have 6 snakes in a row spawned sequentially, which could potentially make the game unwinnable depending on ladder positions. Edge cases such as this would need to be worked around to make this "production ready".

