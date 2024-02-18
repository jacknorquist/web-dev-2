# Conceptual Exercise

Answer the following questions below in Markdown.
Check out the
[Markdown Cheat Sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

## CSS

### What are differences between ``display: inline`` and ``display: block``?
Display:inline displays as many elements inside of a single line that can fit. Height and width properties have no effect.

Display:block displays elements in a brand new line or block no matter the width.
### What are some advantages to using a CSS framework like Twitter Bootstrap?
CSS frameworks allow you to create layouts and designs with the framework's pre-made design classes. This can save you time while your creating html elements and help with the overall layout. For example, bootstrap  allows the user to target specific layout rules for specific screen sizes, thus saving time creating separate css for each breakpoint.

---

## jQuery

### What is jQuery?
jQuery is a javascript library that allows for simpler manipulation and handling of the DOM.
### What are differences between finding things with
`document.querySelector(".book")` and `$(".book")`?
1. `document.querySelector(".book")` is a vanilla javascript way of finding an element. After finding this element you must store it in a variable to be able to change or manipulate the element.
    Ex: let book = `document.querySelector(".book")`;
        book.setAttribute('id','good-book');
        book.setAttribute('class','something-else')
2. `$(".book")` is a jQuery way of finding an element. After finding this element you can chain methods and manipulate directly onto what you found.
    Ex: `$(".book")`
            .slideUp(2000);
            .className('.good-book')
---

## Advanced JavaScript

### What is event delegation? Why would you use it?
Event delegation is attaching an event handler to an element that only fires when certain criteria are met such as the element type being a button.
    Ex: $('table).on('click','td',handleCellClick)
        In this example the handleCellClick is delegated from the table to all 'td' elements within it.

You would use this in the case that you want event handlers on elements that have not been created yet.
### What is the `event` object? What kinds of things are in it?

### In the Hack or Snooze API project, what did we use async/await for?
We used async for functions that made calls to apis and await for the actual fetch to the api.
### What happens if you forget the `async` keyword on  the declaration of a function that uses `await` inside of it?
You get a syntax error and the function is never executed. You need async in front of any function that uses await.

### What happens if you forget the `await` keyword in front of an asynchronous expression?
You receive a promise and not the actual response that you wanted to get from the fetch. This promise will not contain the data that you need to use from the fetch so you need to await it.
### What is the difference between a static method and an instance method?
Static methods are methods to be used with a class, instance methods are to be used with an instance. Static methods can be described as utility functions and are often used in cases where you do not want to create a new instance in order to have access to the method.
### In JS: `let a = [1, 2, 3]; b = a.slice(); a.push(4);`: does `b` contain 4? Why or why not?
No. Slice returns a shallow copy of an array with the given parameters. In this example 'b' is set to equal same as 'a' before 'a' receives '4' with a.push(4).

b === [1,2,3] //true

### What are some strategies you've learned for being organized in larger projects, like Hack or Snooze?
 1. Take the time to understand the code base at a higher level (the inter-workings).
 2. Spliting up my VSCode screen to show two files at once can be helpful to get a better picture of how different functionalities are talking with one another.
 3. Using the event listener in the debugger console can be very helpful.
 4. Taking the 5-10 minute break can do wonders on your brain.

---

## How the Web Works and APIs

### What is a hostname?
A hostname is the human readable name that is assigned to the ip address.
### What is an IP address?
The address assigned to any device that is connected to a network.
### What is a port?
A port is a sort of channel that allows for communication between devices. Every server has 65,535 unique ports that a device can talk to.

HTTP requests direct to port 80 by default.
HTTPS request direct to port 443 by default.
### What is DNS?
DNS (domain name system) is the system used to translate the the human readable host name into the corresponding ip address.

Ex: 123.77.32.121 === facebook.com
### What is an HTTP header?
HTTP header is type of data that is sent and received on each http request and response. The http header in a request will contain information such as the date, hostname, and language. The http header in a response will contain information such as date, content type, and cookies.
### What is an HTTP Response Code?
HTTP Response code is the code that you receive in the HTTP response telling you the status of the request.
    Ex: 200 OK
        404 Not Found
### What is the difference between GET and POST?
Get and post are two different HTTP methods. You use GET when you would like to receive information/data. You use POST when you would like to change data.

GET Ex: Requesting user information from social media api.
POST Ex: Sending a book to an api's database
### What is AJAX? Why would you use it?
Asynchronous JavaScript and XML

AJAX allows you to send requests and receive responses without having to reload the browser. You should use it when you are sending or receiving requests and don't want to reload the entire page or browser upon that request or response.

EX: Entering and submitting information that is sent to and api to calculate a tax rate. --- AJAX can be used here to get and show the api response without having to reload the page.

### What is JSON?
JavasScript Object Notation

HTTP requires data to be in text form. JSON is the text/string version of javascript objects that allows http text requirements to be met.
### What is an API?
Set of clearly defined methods for communication between various components.

Ex: pokemon API: defines the requirements that must be met in order to receive information about a single pokemon. Also defines and the response that will be given.
### What are some limitations of AJAX requests?
-Tokens and personal information can be seen if they are inside of public view JS files.
-Asynchronous by default (fetch returns a promise)
-AJAX pages are more difficult to improve SEO. (Source: https://www.devopsschool.com/blog/what-is-ajax-what-are-its-advantage-and-disadvantage/)

### What is the Same Origin Policy?
The default ajax security policy that declares that ajax requests may only be made with same hostname, protocol, and port as the api.

Cross-origin resource sharing is the way around this.