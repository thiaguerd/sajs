# Simple Alert 

![npm](https://img.shields.io/npm/v/sajs)
[![install size](https://packagephobia.now.sh/badge?p=sajs)](https://packagephobia.now.sh/result?p=sajs)
![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/sajs)

## Install

```
import sa from 'sajs'
```

## Examples

The basic:

```javascript
ba("This is a message!")
```
Call alert with title and message:

```javascript
ba("Hello!","This is a message!")
```
Callbacks functions:

```javascript
ba({
	title: "You are sure?",
	message: "You want delete this post?",
	onConfirm: function(){
		ba("Your post has been deleted.")
	},
	onClose: function(){
		ba("Your post is safe :)")
	}
})
```

Add class to butons:

```javascript
ba({
	message: "Adding css class to butons",
	closeClass: "btn_blue",
	confirmClass: "btn_red"
})
```

Change text from buttons

```javascript
ba({
	message: "Custom text",
	confirmText: "don't confirm that!",
	closeText: "close is safe"
})
```

Click on shadow to close alert

```javascript
ba({
	message: "Click on shadow to close",
	closeOnClickShadow: true
})
```

Set default class to close and confirm buttons

```javascript
SimpleAlert.bt_confirm_class = "btn btn-success"
SimpleAlert.bt_close_class   = "btn btn-default"
```

## Depencencies
- [transit](http://ricostacruz.com/jquery.transit/)
- [jquery](https://github.com/jquery/jquery/)


This is a npm package based from [here](http://github.com/thiaguerd/simple_alert)