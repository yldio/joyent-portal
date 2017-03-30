// Please feel free to either duplicate this
// ...or make it more dynamic to suit your purposes :)

const primaryList = `Consul
Nginx
MongoDB`;

const list = `AccountService
AddressService
BloomreachService
CartService
Extra service reported by ContainerPilot: CartService-HTTPS
CCTokenizationClientService
CheckoutService
ColorSwatchService
EmailMarketingService
FavoriteService
FindInStoreService
FitpredictorService
HidefromcatalogService
InternationalCheckoutService
InternationalPOService
InternationalShippingService
InventoryService
LocalizationService
MoreAccountService
NavigationService
OrderCreationJob
OrderService
OrderService
PaymentMethodService
PaymentService
PaymentService
PriceService
PrivatesaleService
ProductArrayService
ProductDetailService
ProductService
ProfileService
PromoService
PromotionService
QuestionanswerService
RedBaloonService
Extra service reported by ContainerPilot: RedBaloonService-HTTPS
ReviewsService
SearchFacetsService
SearchIndexService
ShopRunnerService
TaxService
ToggleService
UserAccountService
UserAuthenticationService
WaitlistOverlayService
WaitlistService`;

const primaryServices = primaryList.split('\n');
const servicesList = list.split('\n');

/*
{
    "uuid": "be227788-74f1-4e5b-a85f-b5c71cbae8d8",
    "id": "wordpress",
    "name": "Wordpress",
    "project": "e0ea0c02-55cc-45fe-8064-3e5176a59401",
    "instances": 1,
    "metrics": [{
      "type": "2aaa237d-42b3-442f-9094-a17aa470014b",
      "dataset": "crazy-cpu"
    }, {
      "type": "dca08514-72e5-46ce-ad91-e68b3b0914d9",
      "dataset": "crazy-disk"
    }, {
      "type": "dca08514-72e5-46ce-ad92-e68b3b0914d4",
      "dataset": "crazy-memory"
    }],
    "connections": [
      "6a0eee76-c019-413b-9d5f-44712b55b993",
      "6d31aff4-de1e-4042-a983-fbd23d5c530c",
      "4ee4103e-1a52-4099-a48e-01588f597c70"
    ]
  }
*/

const mappedServicesList = servicesList.map((service, index) => {
  const uuid = Math.round(Math.random()*1000000);
  const connections = index%5 ? null : ['primary-mongodb'];
  const instances = 3 + Math.round(Math.random()*2);

  const s = {
    uuid: uuid,
    id: service.toLowerCase(),
    name: service,
    instances: instances,
    project: '9fcb374d-a267-4c2a-9d9c-ba469b804639',
    'metrics': [{
      "type": "2aaa237d-42b3-442f-9094-a17aa470014b",
      "dataset": "crazy-cpu"
    }, {
      "type": "dca08514-72e5-46ce-ad91-e68b3b0914d9",
      "dataset": "crazy-disk"
    }, {
      "type": "dca08514-72e5-46ce-ad92-e68b3b0914d4",
      "dataset": "crazy-memory"
    }]
  };

  if(connections) {
    s.connections = connections;
  }
  return s;
});

const mappedPrimaryServicesList = primaryServices.map((service, index) => {
  const uuid = `primary-${service.toLowerCase()}`;
  const connections = uuid === 'primary-nginx' ?
    mappedServicesList.map(s => s.uuid) : null;
  const instances = uuid === 'primary-nginx' ? 1 : 3;

  const s = {
    uuid: uuid,
    id: service.toLowerCase(),
    name: service,
    instances: instances,
    project: '9fcb374d-a267-4c2a-9d9c-ba469b804639',
    'metrics': [{
      "type": "2aaa237d-42b3-442f-9094-a17aa470014b",
      "dataset": "crazy-cpu"
    }, {
      "type": "dca08514-72e5-46ce-ad91-e68b3b0914d9",
      "dataset": "crazy-disk"
    }, {
      "type": "dca08514-72e5-46ce-ad92-e68b3b0914d4",
      "dataset": "crazy-memory"
    }]
  };
  if(connections) {
    s.connections = connections;
  }
  return s;
});

const meow = mappedPrimaryServicesList.concat(mappedServicesList);

console.log('meow = ', JSON.stringify(meow));
