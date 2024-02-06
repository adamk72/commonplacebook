# Dates

## 05-FEB-2024

- Target Time: 1h
- Goal: Follow up from 04 & 05
- Result: Pulled info via user data. Pull word data.
- @TODO: Make sure that user-words can't duped for a user (which can happen code, but I'm wondering if there would be a good practice doing it at the CM level)


## 05-FEB-2024

- Target Time: 1h (35m)
- Goal: Follow up from 04-FEB
- Result: Partially got it working. Need to get ID from email, apparently, in order to filter? How do I pull the actual data? [oh, duh. You pull the ID directly from the user object 🤦‍♂️]

### Journal

- "owner" expects a number, but the type system is looking for something more complex. If I pass an email string in, the findMany breaks. Docs imply that should be okay(?). 
- Also, how do I get the actual word out of the DB with FindMany?


## 04-FEB-2024

- Target Time: 3h ✅
- Goal: Get a basic api in place that creates a complex record with a many-to-one relation of users to a word. There should user-specific parameters for that word. What is the condition for that to work? This may need to take the form of a specific API that does a lot of sever side loading rather that trying to finagle the details on the client side though numerous API calls. Rationale is to save the network call effort.
- Test details:
  - Should be able to delete the user-specific parameters when deleting the entire user (but not the words).

### Journal

The goal is to figure out how to get the api properly running. Right now I'm lacking context so this is quite the learning and experimentation experience. I need to figure out how this would be used, at least initially. Imagine a list of words that is preloaded into the system where a new user will be assigned that list (as a way of defaulting their starting environment). The user has the ability to hide/show words, so it needs to be something there is the primary dictionary of words and then there is a user dictionary of words. The user words have additional parameters that only the user can change.

For this exercise, I'm trying to figure out how to &mdash; given a preexisting list &mdash; pull down associated user words and show them in a Postman response after a GET call. To start:

1. I need to manually populate the content types. ✅
2. I need the correct associations between the content types.
3. I need an API route that pulls the data &mdash; What is this called, if it's not a default? (I think `user-dictionary` will work; when calling, I just need to make sure that the `owner` field matches the `user` that is calling the API).
4. I need to show the specific words rather than the default IDs that Strapi provides. This means making a sub-query on the list of words in order to get the info. Output might look something like this:

```json
{
  "message": "you got here",
  "userId": "3",
  "wordList" [
    {"word": "foo", "visibility": "visible", "intent":  "still learning"},
    {"word": "bar", "visibility": "hidden", "intent":  "still learning"}
  ]
  }
}
```

### What I ended up getting done.

- enabled the debugger for Strap.
- research into Koa in order to understand `ctx` better.
- update [diagram](https://drive.google.com/file/d/17NgirP3uNDS9I5zEbsi9uJy_sCHzy5ku/view?usp=sharing) with some new class diagrams.
- removing user-dictionary and focusing on simply associating user-words with the owner. "Override" `find` through using `super`.

#### Next time:

- have the user-words pull only the user specific data on the `find` call.
