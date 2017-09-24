(function () {

  var layout = {
    template:
    '<godus godus-temp-name="mygodus">' +
    '<h1>Welcome to Godus</h1>' +
    ' <div class="div-container">' +
    '  <label godus-name="label1">How are things : </label> <input class="input-text" godus-name="textInput"/>' +
    ' </div>' +
    '</godus>',
    template2:
    '<godus godus-temp-name="mygodusTemplate2">' +
    '<h1>Welcome to Godus COMMMMM</h1>' +
    ' <div class="div-table" godus-name="mainDiv">' +
    '  <label godus-name="label1">Godus</label><input class="input-text" godus-name="nameInput"/>' +
    '  <label godus-name="label2">Godus2 </label><input class="input-text" godus-name="snameInput"/>' +
    ' </div>' +
    ' <div class="div-table" godus-name="mainDiv2">' +
    ' <div class="div-table" godus-name="mainDiv3">' +
    '  <label godus-name="label1">Godus</label><input class="input-text" godus-name="nameInput"/>' +
    '  <label godus-name="label2">Godus2 </label><input class="input-text" godus-name="snameInput"/>' +
    ' </div>' +
    '  <label godus-name="label1">Godus</label><input class="input-text" godus-name="nameInput"/>' +
    '  <label godus-name="label2">Godus2 </label><input class="input-text" godus-name="snameInput"/>' +
    ' </div>' +
    '</godus>' +
    '<godus godus-temp-name="mygodus2Template2">' +
    '<h1> PPPPA</h1>' +
    ' <div class="div-table" godus-name="mainDiv">' +
    '  <label godus-name="label1">Godus</label><input class="input-text" godus-name="nameInput"/>' +
    '  <label godus-name="label2">Godus2 </label><input class="input-text" godus-name="snameInput"/>' +
    ' </div>' +
    ' <div class="div-table" godus-name="mainDiv2">' +
    ' <div class="div-table" godus-name="mainDiv3">' +
    '  <label godus-name="label1">Godus</label><input class="input-text" godus-name="nameInput"/>' +
    '  <label godus-name="label2">Godus2 </label><input class="input-text" godus-name="snameInput"/>' +
    ' </div>' +
    '  <label godus-name="label1">Godus</label><input class="input-text" godus-name="nameInput"/>' +
    '  <label godus-name="label2">Godus2 </label><input class="input-text" godus-name="snameInput"/>' +
    ' </div>' +
    '</godus>'
  };

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  // godusConfig = { template : <html string> , layout: <div id="app"></div> }; 
  var Godus = Class.create({
    initialize: function (godusConfig) {
      this.godusConfig = godusConfig || {};
      this.template = godusConfig.template || layout.template;
      this.layout = godusConfig.layout || new Element('div', { class: 'godus-layout', id: guid() });
      this.scrTarget = godusConfig.scrTarget || null;
      this.scrTargetName = godusConfig.scrTargetName || null;
      this.godusTempName = {};
      this._attrs = {};
    },
    setChildById: function (element, childID, isSearchInnerDescendant) {
      var retElement = null;
      var lstChildren = isSearchInnerDescendant ? this.getAllDescendant(element) : element.childNodes;
      for (var i = 0; i < lstChildren.length; i++) {
        var godusName = lstChildren[i].getAttribute('godus-name') || null;
        var id_orig = lstChildren[i].id || null;
        if (id_orig === null) {
          lstChildren[i].id = guid();
        }
        if (godusName) {
          this._attrs[godusName] = lstChildren[i];
        }
        if (lstChildren[i].id == childID) {
          retElement = lstChildren[i];
          break;
        }
      }
      return retElement;
    }, getAllDescendant: function (element, lstChildrenNodes) {
      lstChildrenNodes = lstChildrenNodes ? lstChildrenNodes : [];
      var lstChildren = element.childNodes;
      for (var i = 0; i < lstChildren.length; i++) {
        if (lstChildren[i].nodeType == 1) {// 1 is 'ELEMENT_NODE' 
          lstChildrenNodes.push(lstChildren[i]);
          lstChildrenNodes = this.getAllDescendant(lstChildren[i], lstChildrenNodes);
        }
      }// loop 
      return lstChildrenNodes;
    },
    snoop: function () {
      var template = this.template;
      var layout = this.layout;

      //add template to layout
      layout.insert(template);

      var parser = new DOMParser();
      var _docTemplate = parser.parseFromString(template, "text/html");
      var _godusTagAllTemplate = _docTemplate.getElementsByTagName('godus');
      var _godusTempNameAll = [];
      for (var i = 0; i < _godusTagAllTemplate.length; i++) {
        var godusTempName = _godusTagAllTemplate[i].getAttribute('godus-temp-name');
        _godusTempNameAll.push(godusTempName);
      }

      var godusTags = layout.getElementsByTagName('godus');
      for (var i = 0; i < godusTags.length; i++) {
        this._attrs = {};
        var elements = godusTags[i];
        var godusTempName = elements.getAttribute('godus-temp-name');
        if (_godusTempNameAll.indexOf(godusTempName) !== -1) {
          this.setChildById(elements, "AUTO", true);
          this.godusTempName[godusTempName] = this._attrs;
        }
      }
      this._$final();
    }, scaner() {
      var scrTarget = this.scrTarget;
      if (scrTarget === null) return;
      var godusTags = scrTarget.getElementsByTagName('godus') || [];
      this._attrs = {};
      for (var i = 0; i < godusTags.length; i++) {
        this._attrs = {};
        var elements = godusTags[i];
        var godusTempName = elements.getAttribute('godus-temp-name') || 'godus-temp-name-' + guid();
        this.setChildById(elements, "AUTO", true);
        this.godusTempName[godusTempName] = this._attrs;
      }
      this._$final();
    },
    _$final: function () {
      this._attrs = {};
    }
  });
  ////////////////// 
  godus = new Godus({
    template: layout.template,
    layout: $('godus1')
  });
  godus.snoop();
  //---------------------------
  godus2 = new Godus({
    scrTarget: $('godus2')
  });
  godus2.scaner();
  // ---------------------------
  godus3 = new Godus({
    template: layout.template2,
    layout: $('godus3')
  });
  godus3.snoop();
})();
