
/* ======= Model ======= */

let model = {
    currentCat: null,
    cats: [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'img/434164568_fea0ad4013_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'img/4154543904_6e2428c421_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'img/22252709_010df3379e_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'Shadow',
            imgSrc : 'img/1413379559_412a540d29_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'img/9648464288_2516b35537_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
};


/* ======= Octopus ======= */

let octopus = {

    init: function () {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        adminFormView.init();
        adminButtonView.init();
        catListView.init();
        catView.init();

    },

    getCurrentCat: function () {
        return model.currentCat;
    },

    getCats: function () {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function (cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function () {
        model.currentCat.clickCount++;
        catView.render();

    }
};


/* ======= View ======= */

function  submit() {
    let currentCat = octopus.getCurrentCat();
    currentCat.name = document.getElementById('cat-admin-form-name').value;
    currentCat.imgSrc = document.getElementById('cat-admin-form-name-url').value;
    currentCat.clickCount = document.getElementById('cat-admin-form-clk').value;
    octopus.setCurrentCat(currentCat);
}

let  adminFormView = {


    init:function () {
        this.adminForm = document.getElementById('admin-form');
        console.log(`init admin form ${this.adminForm}`);
        this.visible = true;
        this.render();
        this.submitButton = document.getElementById('form-submit');

        this.submitButton.addEventListener('click',function () {
            submit();
        });


    },
    setVisible: function(boolFlag){
        this.visible = boolFlag;

    },
    getVisible: function(){
        return this.visible;
    },
    render:function () {
        console.log(`admin form ${this.adminForm}`);
        if (this.visible ) {
            let currentCat = octopus.getCurrentCat();

            document.getElementById('cat-admin-form-name').value = currentCat.name;
            document.getElementById('cat-admin-form-name-url').value = currentCat.imgSrc;
            document.getElementById('cat-admin-form-clk').value = currentCat.clickCount;
            this.adminForm.style.display = 'block';
        }
        else{
           this.adminForm.style.display = 'none';
        }
    }

};

let adminButtonView = {
    init:function () {
        this.admButtonId = document.getElementById('admin-btn');
        this.admButtonId.addEventListener('click', function(){

            adminFormView.setVisible(!adminFormView.getVisible());
            adminFormView.render();
        })

    }
};

let catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        //this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
        //adminFormView.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        let currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
        this.catImageElem.classList.add('image-link');
         adminFormView.render();
    }
};

let catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        let  cat, elem, i;
        // get the cats we'll be rendering from the octopus
        let  cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;
            elem.classList.add('list-item-link');

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

// make it go!
octopus.init();
