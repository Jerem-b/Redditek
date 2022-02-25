import {app_store} from './App';

let params = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `bearer ${app_store['token']}`,
  },
};

console.log(params);

async function APIgetMe() {
  var copyParams = {...params};
  copyParams.method = 'GET';
  return await fetch('https://oauth.reddit.com/api/v1/me', copyParams);
}

async function APIgetSettings() {
  var copyParams = {...params};
  params.method = 'GET';
  return await fetch('https://oauth.reddit.com/api/v1/me/prefs', copyParams);
}

async function APIupdateSettings(value) {
  var copyParams = {...params};
  copyParams.method = 'PATCH';
  copyParams.body = JSON.stringify(value);
  return await fetch('https://oauth.reddit.com/api/v1/me/prefs', copyParams);
}

async function APIsearchSubreddits(querySearch, after) {
  var copyParams = {...params};
  copyParams.method = 'GET';
  return await fetch(
    `https://oauth.reddit.com/api/subreddit_autocomplete_v2?query=${querySearch}&after=${after}`,
    copyParams,
  );
}

async function APIgetPopularSubreddit(after) {
  var copyParams = {...params};
  copyParams.method = 'GET';
  return await fetch(
    `https://oauth.reddit.com/subreddits/popular?limit=10&after=${after}`,
    copyParams,
  );
}

async function APIgetContent(subreddit, after) {
  var copyParams = {...params};
  copyParams.method = 'GET';
  return await fetch(
    `https://oauth.reddit.com${subreddit}?limit=10&after=${after}`,
    copyParams,
  );
}

async function APIsubscribe(action, name) {
  var copyParams = {...params};
  copyParams.method = 'POST';
  copyParams.body = JSON.stringify({action: action, sr_name: name});
  return await fetch(
    `https://oauth.reddit.com/api/subscribe?action=${action}&sr=${name}`,
    copyParams,
  );
}

export {
  APIgetMe,
  APIgetSettings,
  APIupdateSettings,
  APIsearchSubreddits,
  APIgetPopularSubreddit,
  APIgetContent,
  APIsubscribe,
};
