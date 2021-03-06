Package.describe({
  name: 'jamgold:bootstrap3boilerplate',
  summary: 'Provide basic bootstrap-3 template with alert & modal & navbar & footer',
  version: '0.0.4_2',
  git: 'https://github.com/jamgold/jamgold-bootstrap3boilerplate'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use(['reactive-var','jamgold:isdevelopment@0.0.1']);
  api.use(['templating','handlebars'], 'client');
  api.export('Bootstrap3boilerplate');
  api.addFiles(['jamgold:bootstrap3boilerplate.html','jamgold:bootstrap3boilerplate.js','jamgold:bootstrap3boilerplate.css','public/development.png'],'client');
});
