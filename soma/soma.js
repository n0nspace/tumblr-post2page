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
    
    var filters = {};
    let $grid;

    buildLayout();
  
  
  //BUILD LAYOUT FUNCTION
  function buildLayout() {
    $('.lds-ring').fadeOut();
    var filters = {}; //should be outside the scope of the filtering function
    //initialise isotope
    $grid = $('#grid').isotope({
      itemSelector: '.card',
      masonry: {
        fitWidth: true,
      }
    });
    
    showItems();
  
  }

  $(".filter a").on('click', function(e) {
    console.log("starts");
    $(".card").removeClass("is-visible");
    $('.lds-ring').fadeIn();

    var $this = $(this); // cache the clicked link
    var filterAttr = "data-filter";
    var filterValue = $this.attr(filterAttr); // cache the filter
    var $optionSet = $this.parents(".l-level2"); // cache the parent element
    var group = $optionSet.attr("data-filter-group"); // cache the parent filter group
    var filterGroup = filters[group];
    if (!filterGroup) {
      filterGroup = filters[group] = [];
    }
    var $selectAll = $optionSet.find('a['+filterAttr+'=""]'); // the 'select all' button in the current group
    var activeClass = "selected", // the class for active links
      exclClass = "exclusive"; // the class for exclusive groups
    comboFiltering($this,filters,filterAttr,filterValue,$optionSet,group,$selectAll,activeClass,exclClass);
    var comboFilter = getComboFilter(filters);
    $grid.isotope({
      filter: comboFilter
    });
    $this.toggleClass(activeClass);
    e.preventDefault();

    $('.lds-ring').fadeOut();
    showItems();
  });

  function showItems() {
    $('.card').each(function(i) {
     setTimeout(function() {
        $('.card').eq(i).addClass('is-visible');
      }, 1 * i);
    });
  } 
