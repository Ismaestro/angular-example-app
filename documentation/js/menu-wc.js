'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">angular-example-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-2268fc2e54f014ec52cac9817004330c35019137a4c69bc7bbe1bd99811a3599e74a73e87eb2b675d90cfc02e8b182420c62ad696d54eb107acaba5ab50dae71"' : 'data-target="#xs-components-links-module-AppModule-2268fc2e54f014ec52cac9817004330c35019137a4c69bc7bbe1bd99811a3599e74a73e87eb2b675d90cfc02e8b182420c62ad696d54eb107acaba5ab50dae71"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-2268fc2e54f014ec52cac9817004330c35019137a4c69bc7bbe1bd99811a3599e74a73e87eb2b675d90cfc02e8b182420c62ad696d54eb107acaba5ab50dae71"' :
                                            'id="xs-components-links-module-AppModule-2268fc2e54f014ec52cac9817004330c35019137a4c69bc7bbe1bd99811a3599e74a73e87eb2b675d90cfc02e8b182420c62ad696d54eb107acaba5ab50dae71"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-1b5b308ff26fa2857d9584e9ab3e83ea027142f0292293f4c9ca08132d458a59def48a9311d8cd95a8a9bf6517297b87b2e71e2dea92a8a81fc25349ecfedb7c"' : 'data-target="#xs-components-links-module-AuthModule-1b5b308ff26fa2857d9584e9ab3e83ea027142f0292293f4c9ca08132d458a59def48a9311d8cd95a8a9bf6517297b87b2e71e2dea92a8a81fc25349ecfedb7c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-1b5b308ff26fa2857d9584e9ab3e83ea027142f0292293f4c9ca08132d458a59def48a9311d8cd95a8a9bf6517297b87b2e71e2dea92a8a81fc25349ecfedb7c"' :
                                            'id="xs-components-links-module-AuthModule-1b5b308ff26fa2857d9584e9ab3e83ea027142f0292293f4c9ca08132d458a59def48a9311d8cd95a8a9bf6517297b87b2e71e2dea92a8a81fc25349ecfedb7c"' }>
                                            <li class="link">
                                                <a href="components/LogInPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogInPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignUpPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignUpPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CoreModule-7f9728d36b337a5819db31b8334778b8d42c82f417811c4615d03822b63a084660d47aea25228951d58078916a4e08dba61781ca33383f4edf665f363611d8ed"' : 'data-target="#xs-injectables-links-module-CoreModule-7f9728d36b337a5819db31b8334778b8d42c82f417811c4615d03822b63a084660d47aea25228951d58078916a4e08dba61781ca33383f4edf665f363611d8ed"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoreModule-7f9728d36b337a5819db31b8334778b8d42c82f417811c4615d03822b63a084660d47aea25228951d58078916a4e08dba61781ca33383f4edf665f363611d8ed"' :
                                        'id="xs-injectables-links-module-CoreModule-7f9728d36b337a5819db31b8334778b8d42c82f417811c4615d03822b63a084660d47aea25228951d58078916a4e08dba61781ca33383f4edf665f363611d8ed"' }>
                                        <li class="link">
                                            <a href="injectables/StorageService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StorageService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GraphQLModule.html" data-type="entity-link" >GraphQLModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HeroModule.html" data-type="entity-link" >HeroModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HeroModule-0e577b55ace5ed785a587d128420ec0c9d1e2d588dbae2f6a2d8c7379bac4ab0bd1f91b0749b629b3904d7d84b144ad3261e91b4b6641e7ebb946dc739024527"' : 'data-target="#xs-components-links-module-HeroModule-0e577b55ace5ed785a587d128420ec0c9d1e2d588dbae2f6a2d8c7379bac4ab0bd1f91b0749b629b3904d7d84b144ad3261e91b4b6641e7ebb946dc739024527"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HeroModule-0e577b55ace5ed785a587d128420ec0c9d1e2d588dbae2f6a2d8c7379bac4ab0bd1f91b0749b629b3904d7d84b144ad3261e91b4b6641e7ebb946dc739024527"' :
                                            'id="xs-components-links-module-HeroModule-0e577b55ace5ed785a587d128420ec0c9d1e2d588dbae2f6a2d8c7379bac4ab0bd1f91b0749b629b3904d7d84b144ad3261e91b4b6641e7ebb946dc739024527"' }>
                                            <li class="link">
                                                <a href="components/HeroDetailPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeroDetailPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeroRemoveComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeroRemoveComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MyHeroesPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MyHeroesPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HeroRoutingModule.html" data-type="entity-link" >HeroRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link" >MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RootModule.html" data-type="entity-link" >RootModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RootModule-9472897cfcf461cb7ab64fc5f3caa6ca340d408f4b11268dc94f733fdfec3550c325edd3dcfb52bb95fc7e7f6d76ce47515d36d80a6e7798daf60163e277bf72"' : 'data-target="#xs-components-links-module-RootModule-9472897cfcf461cb7ab64fc5f3caa6ca340d408f4b11268dc94f733fdfec3550c325edd3dcfb52bb95fc7e7f6d76ce47515d36d80a6e7798daf60163e277bf72"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RootModule-9472897cfcf461cb7ab64fc5f3caa6ca340d408f4b11268dc94f733fdfec3550c325edd3dcfb52bb95fc7e7f6d76ce47515d36d80a6e7798daf60163e277bf72"' :
                                            'id="xs-components-links-module-RootModule-9472897cfcf461cb7ab64fc5f3caa6ca340d408f4b11268dc94f733fdfec3550c325edd3dcfb52bb95fc7e7f6d76ce47515d36d80a6e7798daf60163e277bf72"' }>
                                            <li class="link">
                                                <a href="components/Error404PageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Error404PageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomePageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchBarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RootRoutingModule.html" data-type="entity-link" >RootRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-83c7d1073146942894e9fa37ad96977012ce8c21aca284a6890b88e3271c6092c9f503ecc013899d5f2aed57e1eb52bd280b9db62bc9db080c8d7bc0be3afc16"' : 'data-target="#xs-components-links-module-SharedModule-83c7d1073146942894e9fa37ad96977012ce8c21aca284a6890b88e3271c6092c9f503ecc013899d5f2aed57e1eb52bd280b9db62bc9db080c8d7bc0be3afc16"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-83c7d1073146942894e9fa37ad96977012ce8c21aca284a6890b88e3271c6092c9f503ecc013899d5f2aed57e1eb52bd280b9db62bc9db080c8d7bc0be3afc16"' :
                                            'id="xs-components-links-module-SharedModule-83c7d1073146942894e9fa37ad96977012ce8c21aca284a6890b88e3271c6092c9f503ecc013899d5f2aed57e1eb52bd280b9db62bc9db080c8d7bc0be3afc16"' }>
                                            <li class="link">
                                                <a href="components/HeroCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeroCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeroLoadingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeroLoadingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoadingPlaceholderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoadingPlaceholderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpinnerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpinnerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-SharedModule-83c7d1073146942894e9fa37ad96977012ce8c21aca284a6890b88e3271c6092c9f503ecc013899d5f2aed57e1eb52bd280b9db62bc9db080c8d7bc0be3afc16"' : 'data-target="#xs-pipes-links-module-SharedModule-83c7d1073146942894e9fa37ad96977012ce8c21aca284a6890b88e3271c6092c9f503ecc013899d5f2aed57e1eb52bd280b9db62bc9db080c8d7bc0be3afc16"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-83c7d1073146942894e9fa37ad96977012ce8c21aca284a6890b88e3271c6092c9f503ecc013899d5f2aed57e1eb52bd280b9db62bc9db080c8d7bc0be3afc16"' :
                                            'id="xs-pipes-links-module-SharedModule-83c7d1073146942894e9fa37ad96977012ce8c21aca284a6890b88e3271c6092c9f503ecc013899d5f2aed57e1eb52bd280b9db62bc9db080c8d7bc0be3afc16"' }>
                                            <li class="link">
                                                <a href="pipes/CapitalizeFirstPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CapitalizeFirstPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Hero.html" data-type="entity-link" >Hero</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventsService.html" data-type="entity-link" >EventsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HeroService.html" data-type="entity-link" >HeroService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerService.html" data-type="entity-link" >LoggerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SentryErrorHandler.html" data-type="entity-link" >SentryErrorHandler</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StorageService.html" data-type="entity-link" >StorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UtilsHelperService.html" data-type="entity-link" >UtilsHelperService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UtilsService.html" data-type="entity-link" >UtilsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/TimingInterceptor.html" data-type="entity-link" >TimingInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/TokenInterceptor.html" data-type="entity-link" >TokenInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/HeroResolver.html" data-type="entity-link" >HeroResolver</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Deserializable.html" data-type="entity-link" >Deserializable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventType.html" data-type="entity-link" >EventType</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});