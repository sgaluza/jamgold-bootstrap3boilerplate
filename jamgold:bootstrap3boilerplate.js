//
// navbar-default navbar-inverse navbar-fixed-top navbar-static-top
//
Bootstrap3boilerplate = {
	ProjectName: new ReactiveVar('Project Name'),
	fluid: new ReactiveVar(false),
	iron_router: false,
	notFound: 'Bootstrap3boilerplateNotFound',
	Navbar: {
		type: new ReactiveVar('navbar-default'),
		inverse: new ReactiveVar(false),
		left: function() {
			return [
				{href:'#hello',text:'Home'},
				{href:'#about',text:'About'},
				{href:'#contact',text:'Contact'},
				{text:'Dropdown',dropdown:[
					{href:'#action1',text: 'Action'},
					{href:'#action2',text: 'Another Action'},
					{divider: true},
					{header: 'Some More'},
					{href:"#sep1", text: 'Separated link'},
					{href:"#sep2", text: 'One more separated link'}
				]}
			];
		},
		right: function() {
			return [
			{href:"#",text:'Default',classes: 'bootstrap3boilerplateNavbar_type navbar_default', active: Bootstrap3boilerplate.Navbar.type.get() == 'navbar-default'},
			{href:"#",text:'Static top', classes: 'bootstrap3boilerplateNavbar_type navbar_static_top', active: Bootstrap3boilerplate.Navbar.type.get() == 'navbar-static-top'},
			{href:"#",text:'Fixed top',classes: 'bootstrap3boilerplateNavbar_type navbar_fixed_top', active: Bootstrap3boilerplate.Navbar.type.get() == 'navbar-fixed-top'},
			]
		},
		events: function(events) {
			Template.Bootstrap3boilerplateNavbar.events( events );
		},
		defaultEvents: function() {
			Template.Bootstrap3boilerplateNavbar.events({
				'click a.bootstrap3boilerplateNavbar_type': function (e,t) {
					var c = t.$(e.target).attr('class').split(/ /)[1].replace(/_/g,'-');
					Bootstrap3boilerplate.Navbar.type.set(c);
				},
				'click .navbar-nav.left a': function(e,t) {
					Bootstrap3boilerplate.setTemplate(e.target.href)
				}
			});
		}
	},
	//
	// function used for Template.dynamic
	//
	template: function() {
		var t = Session.get('template');
		return Template[t] == undefined ? Bootstrap3boilerplate.notFound : t;
	},
	setTemplate: function(linkhash) {
		var t = linkhash.split('#')[1];
		if(t) Session.set('template', t);
	},
	// have an init function to setup a Tracker for the body class
	init: function(customEvents){
		this.iron_router = Package['iron:router'] !== undefined;
		if(!this.iron_router)
			this.setTemplate(document.location.hash);
		if(customEvents)
		{
			if(typeof customEvents == 'object')
			{
				this.Navbar.events( customEvents );
			}
		}
		else
		{
			this.Navbar.defaultEvents();
		}
		Tracker.autorun(function () {
			// update body class should Navbar Type change
			$('body').attr('class', 'body-'+Bootstrap3boilerplate.Navbar.type.get());
		});
	}
};

Template.Bootstrap3boilerplateNavbar.helpers({
	// return type of navbar
	type: function () {
		var t = Bootstrap3boilerplate.Navbar.type.get();
		return t == 'navbar-default' ? t : 'navbar-default '+t;
	},
	fluid: function () {
		return Bootstrap3boilerplate.fluid.get() ? 'container-fluid' : 'container';
	},
	inverse: function() {
		return Bootstrap3boilerplate.Navbar.inverse.get() ? 'navbar-inverse' : '';
	},
	normal: function() {
		Bootstrap3boilerplate.Navbar.type.get() == 'navbar-default';
	},
	project_name: function() {
		return Bootstrap3boilerplate.ProjectName.get();
	},
	left: function() {
		return Bootstrap3boilerplate.Navbar.left();
	},
	right: function() {
		return Bootstrap3boilerplate.Navbar.right();
	}
});

Template.Bootstrap3boilerplate.helpers({
	fluid: function () {
		return Bootstrap3boilerplate.fluid.get() ? 'container-fluid' : 'container';
	},
	iron_router: function() {
		return Bootstrap3boilerplate.iron_router;
	},
	template: function() {
		return Bootstrap3boilerplate.template();
	}
});
//
// set the right body class when the Boilerplate gets rendered
//
Template.Bootstrap3boilerplate.rendered = function () {
	$('body').attr('class', 'body-'+Bootstrap3boilerplate.Navbar.type.get());
};

Template._bootstrap3boilerplateNavbar_link.helpers({
	activeLink: function (href) {
		var linkobject = this;
		var r = ' ';
		if(linkobject.active !== undefined)
		{
			r = linkobject.active ? 'active' : ' ';
		}
		else
		{
			if(Bootstrap3boilerplate.iron_router)
			{
				var c = Router.current();
				if(c)
					r = c.route.path() == href ? 'active' : ' ';
				else
					r = href == '/' ? 'active' : ' ';
			}
			else
			{
				var t = Session.get('template');
				r = href == document.location.hash ? 'active' : ' ';
			}
		}
		// console.log(href+' '+r);
		return r;
	},
	getTemplate: function() {
		// console.log(this);
		return this.template;
	}
});

Template.Bootstrap3boilerplateNotFound.helpers({
	notFound: function () {
		var t = Session.get('template');
		return document.location.hash;
	}
});
