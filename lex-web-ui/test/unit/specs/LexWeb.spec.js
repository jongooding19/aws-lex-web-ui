import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';

import Store from '@/store';
import LexWeb from '@/components/LexWeb';
import { config } from '@/config';

/* eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */

describe('LexWeb.vue', () => {
  let store;
  let vm;

  beforeEach(() => {
    Vue.use(Vuex);
    Vue.use(Vuetify);

    store = new Vuex.Store(Store);
    vm = new Vue({
      store,
      template: '<LexWeb/>',
      components: { LexWeb },
    });
  });

  afterEach(() => {
    vm.$destroy();
  });

  it('should render sub components', () => {
    // disable recorder
    vm.$store.commit('setIsRecorderEnabled', false);
    sinon.spy(vm, '$mount');
    vm.$mount();

    const toolbar = vm.$el.querySelector('.toolbar');
    const toolbarTitle = vm.$el.querySelector('.toolbar__title');
    const messageList = vm.$el.querySelector('.message-list');
    const statusBar = vm.$el.querySelector('.status-bar');
    const inputContainer = vm.$el.querySelector('.status-bar');

    expect(toolbar, 'toolbar').is.not.equal(null);
    expect(toolbarTitle, 'toolbar title').is.not.equal(null);
    expect(toolbarTitle.textContent, 'toolbar title')
      .to.contain(config.ui.toolbarTitle);

    expect(messageList, 'message list').is.not.equal(null);
    expect(statusBar, 'status bar').is.not.equal(null);
    expect(inputContainer, 'status bar').is.not.equal(null);
  });
});
