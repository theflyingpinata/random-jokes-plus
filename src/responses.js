const jokes = [
  { q: 'What do you call a very small valentine?', a: 'A valen-tiny!!!' },
  { q: 'What did the dog say when he rubbed his tail on the sandpaper?', a: 'Ruff, Ruff!!!' },
  { q: "Why don't sharks like to eat clowns?", a: 'Because they taste funny!!!' },
  { q: 'What did the boy cat say to the girl cat?', a: "You're Purr-fect!!!" },
  { q: "What is a frog's favorite outdoor sport?", a: 'Fly Fishing!!!' },
  { q: 'I hate jokes about German sausages.', a: 'Theyre the wurst!!!' },
  { q: 'Did you hear about the cheese factory that exploded in France?', a: 'There was nothing left but de Brie!!!' },
  { q: 'Our wedding was so beautiful ', a: 'Even the cake was in tiers!!!' },
  { q: 'Is this pool safe for diving?', a: 'It deep ends!!!' },
  { q: 'Dad, can you put my shoes on?', a: 'I dont think theyll fit me!!!' },
  { q: 'Can February March?', a: 'No, but April May!!!' },
  { q: 'What lies at the bottom of the ocean and twitches?', a: 'A nervous wreck!!!' },
  { q: 'Im reading a book on the history of glue.', a: 'I just cant seem to put it down!!!' },
  { q: 'Dad, can you put the cat out?', a: 'I didnt know it was on fire!!!' },
  { q: 'What did the ocean say to the sailboat?', a: 'Nothing, it just waved!!!' },
  { q: 'What do you get when you cross a snowman with a vampire?', a: 'Frostbite!!!!!' },
];

const getRandomJoke = () => {
  const numJokes = jokes.length;
  const randomNum = parseInt(Math.random() * numJokes, 10);
  const randomJoke = jokes[randomNum];
  const responseObj = {
    q: randomJoke.q,
    a: randomJoke.a,
  };
  return JSON.stringify(responseObj);
};

function getJokeXML(joke) {
  return `<joke>
    <q>${joke.q}</q>
    <a>${joke.a}</a>
  </joke>`;
}

const getRandomJokes = (limit = 1) => {
  // "limit" cleaning
  let limit2 = Number(limit);
  limit2 = !limit2 ? 1 : limit2;
  limit2 = Math.floor(limit2);
  limit2 = limit2 > jokes.length ? jokes.length : limit2;
  limit2 = limit2 < 1 ? 1 : limit2;

  const responseObj = [];
  for (let i = 0; i < limit2; i += 1) {
    responseObj.push(JSON.parse(getRandomJoke()));
  }
  // console.log(responseObj);
  return JSON.stringify(responseObj);
};

const getRandomJokeResponse = (request, response, params, acceptedTypes) => {
  const responseJoke = getRandomJoke();

  if (acceptedTypes.includes('text/xml')) { // Check for XML header
    response.writeHead(200, { 'Content-Type': 'text/xml' });
    response.write(getJokeXML(JSON.parse(responseJoke)));
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(getRandomJoke());
  }
  response.end();
};

const getRandomJokesResponse = (request, response, params, acceptedTypes) => {
  let responseJokes = getRandomJokes(params.limit);

  if (acceptedTypes.includes('text/xml')) { // Check for XML header
    responseJokes = JSON.parse(responseJokes);
    let responseXML = '<jokes>';
    for (let i = 0; i < responseJokes.length; i += 1) {
      responseXML += getJokeXML(responseJokes[i]);
    }
    responseXML += '\n</jokes>';
    console.log(responseXML);
    response.writeHead(200, { 'Content-Type': 'text/xml' });
    response.write(responseXML);
  } else { // JSON response
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(getRandomJokes(params.limit));
  }
  response.end();
};

module.exports.getRandomJokeResponse = getRandomJokeResponse;
module.exports.getRandomJokesResponse = getRandomJokesResponse;
