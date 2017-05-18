# hapi 

Integrations to consider: 
 - [x] [Github](https://github.com/hapijs/bell/blob/master/Providers.md#github)
 - [x] [Bitbucket](https://github.com/hapijs/bell/blob/master/Providers.md#bitbucket)
 - [x] [Gitlab](https://github.com/hapijs/bell/blob/master/Providers.md#gitlab) (hosted and on-premise)
 - [x] [Facebook](https://github.com/hapijs/bell/blob/master/Providers.md#facebook)
 - [x] [Twitter](https://github.com/hapijs/bell/blob/master/Providers.md#twitter)

Aspects to consider: 
 - [x] Hapi integration
 - [x] Consistency
 - [x] Battle tested
 
Regarding "Battle tested": 
 
[Bell](https://github.com/hapijs/bell) has 383 stars and 8664 downloads in the last month. It's nowhere near the 757640 downloads that passport has. However [Eran Hammer](https://github.com/hueniverse) was the lead author and editor of the OAuth2 spec and although he isn't the official maintainer of [Bell](https://github.com/hapijs/bell), he was the creator of it and the second most active contributor.

I wasn't able to find a list of companies using it, I found that developers from the following companies contributed to it:
 - Joyent
 - Walmart Labs
 - Booking.com
 - Microsoft
 - Expedia
 - Yahoo

Being the official Hapi module for third-party authentication, I think it's safe to assume that most companies using Hapi that have this need use this module.


## example `stratagies.json`

```json
[{
  "provider": "twitter",
  "password": "YChZVgVJQyG0Te3lpYzc+9Ag0PuQfUX0ilG3nHIvIlU=",
  "clientId": "",
  "clientSecret": "",
  "isSecure": false
}, {
  "provider": "github",
  "password": "YChZVgVJQyG0Te3lpYzc+9Ag0PuQfUX0ilG3nHIvIlU=",
  "clientId": "",
  "clientSecret": "",
  "isSecure": false
}]
```