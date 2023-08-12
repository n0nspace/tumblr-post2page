# tumblr-post2page
Welcome! Tumblr Post2Page is a (very crude) script that uses [Tumblr's v1 API](https://www.tumblr.com/docs/en/api/v1) to pull the 
contents of posts and create an array with the content to then be used for example in a directly page theme. 
The script was made to be used with Handlebars but you can surely use it to make your own stuff based on the array it generates. 
Further, the script relies on specific post formatting to grab the right content. More on that below.

My page theme SOMA uses this script. You can find the page theme here. For instructions on how to use it, please read on under Post Formatting. 

## Using Post2Page with Handlebars
Here's everything you need to get started:
- [Tumblr's v1 API JSON](https://github.com/n0nspace/tumblr-post2page/edit/main/README.md#get-tumblrs-v1-api-json-output) output to a whole blog or specific tag on the blog 
(e.g. https://soma-preview.tumblr.com/api/read/json?&tagged=soma page cards)
- Post2Page script
- Handlebars
- Some posts on a Tumblr blog

### Get Tumblr's v1 API JSON output

Replace ```[BLOGNAME]``` with your blog name. And ```[YOUR TAGS]``` with your tag. If your tag has spaces, add the spaces.
Place one of the following scripts before closing `</head>` tag.

**For a whole blog:**

```<script src="https://[BLOGNAME].tumblr.com/api/read/json"></script>```

**For specific tagged posts on the blog:**

```<script src="https://[BLOGNAME].tumblr.com/api/read/json?&tagged=[YOUR TAGS]"></script>```

### Post2Page Script

Place before the closing `</head>` tag.

```<script src="https://cdn.jsdelivr.net/gh/n0nspace/tumblr-post2page@latest/post2page.js"></script>```

### Handlebars

You can get the Handlebars script [here](https://handlebarsjs.com/). Or add this before the closing `</head>` tag:

```<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js"></script>```

Handlebars provides templating and lets us use our data from Tumblr post to generate the HTML based on a template we can create. 
Following their guide, we need to create a template that will display our data and then compile it and add our data.

#### Creating a Template

I will only be giving an example to use for a directory page. If you'd like to see more I recommend reading their [documentation](https://handlebarsjs.com/guide/#installation).

You can copy this template into your code anywhere within the `<body></body>` tag. For example, right within your grid container div.

```
<script id="handlebars-template-grid" type="text/x-handlebars-template">
      {{#each []}}
      <!--GRID ITEM START-->
      <div class="card {{this.filters}}">
      <a href="{{this.link}}">
        <img src="{{this.img}}">
      </a>
      <div class="box">
        <h2>{{this.title}}</h2>
        <i>{{this.subtitle}}</i>
        <div class="info">
          <span>Title: </span>
          <span>{{this.title}}</span>
          <span>Duration: </span>
          <span>{{this.duration}}</span>
        <div class="desc">
          {{{this.description}}}
        </div>
      </div>
    </div>
    <!--GRID ITEM END-->
   {{/each}}
</script>
````

**If you'd like to build your own template or want to know how it works:**

A template always follows this scheme:
- Start with a script tag `<script></script>` and an ID (here `handlebars-template-grid`) to define the template.
- The `{{#each []}}{/each}}` block inside which we'll write our HTML code.
- Placeholder tags for your content e.g. `{{this.img}}` in place of the image source URL.

[#each](https://handlebarsjs.com/guide/builtin-helpers.html#each) is a Handlebars helper that lets us iterate over a list of items (in our case, Tumblr posts). `this` references our current list item (post) that's being iterated over, like a for-loop. For example: `{{this.img}}` will insert the image of each post in our list. If you'd like to create your own template or understand

#### Compile Template
Once we have a template, we need to compile it, add our post data to it and add the HTML to the site. 
Copy/paste the following just before your
closing `</body>` tag. 

Replace `gridID` and `templateID` with your respective IDs. 

**Important:** ⚠️ Make sure that the below script comes after the post2page script and before any code that interacts with the HTML items
within the grid (such as Masonry). The HTML does not yet exist before this script runs.

```
<script>
    var gridID = "grid"; /*the div ID of your (grid) container without the hashtag symbol*/
    var templateID = "handlebars-template-grid"; /*the ID of your Handlebars template*/

    /*get the array constructed from post content*/
    var rawr = post2page(tumblr_api_read);
    
    /*get the Handlebars template*/
    var source   = document.getElementById(templateID).innerHTML;
    
    /*compile the Handlebars template*/
    var template = Handlebars.compile(source);
    
    /*building HTML based on template and data*/
    var compiled = template(rawr);

    /*adding HTML inside the grid*/
    document.getElementById(gridID).innerHTML = compiled;
  </script>
```

### Post Formatting




