# tumblr-post2page
Welcome! Tumblr Post2Page is a (very crude) script that uses [Tumblr's v1 API](https://www.tumblr.com/docs/en/api/v1) to pull the 
contents of posts and create an array with the content to then be used for example in a directly page theme. 
The script was made to be used with Handlebars but you can surely use it to make your own stuff based on the array it generates. 
Further, the script relies on specific post formatting to grab the right content. More on that below.

My page theme SOMA uses this script. You can find the page theme here. For instructions on how to use it, please read on under Post Formatting. 

## Using Post2Page in a directory page with Handlebars
Here's everything you need to get started:
- Tumblr's v1 API JSON output to a whole blog or specific tag on the blog 
(e.g. https://soma-preview.tumblr.com/api/read/json?&tagged=soma page cards)
- Handlebars
- This script
- Some posts on a Tumblr blog

### Get Tumblr's v1 API JSON output

**For a whole blog:**

```<script src="https://[BLOGNAME].tumblr.com/api/read/json"></script>```

Replace ```[BLOGNAME]``` with your blog name.

**For specific tagged posts on the blog:**

```<script src="https://[BLOGNAME].tumblr.com/api/read/json?&tagged=[YOUR TAGS]"></script>```

Replace ```[BLOGNAME]``` with your blog name. And ```[YOUR TAGS]``` with your tag. If your tag has spaces, with spaces.

Add one of the aforementioned script tags somewhere before the closing `</head>` tag.

### Handlebars

You can get the Handlebars script [here](https://handlebarsjs.com/). Or use this before the closing `</head>` tag.

```<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js"></script>```

Handlebars provides templating and lets us use our data from Tumblr post to generate the HTML based on a template we can create. 
Following their guide, we need to create a template that will display our data and then compile it and add our data.

#### Creating a Template

I will only be giving an example to use for a directory page. If you'd like to see more I recommend reading their documentation.

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



