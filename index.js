const limit = 12;
let skip = 0;

const itemTemplate = document.querySelector('.col');
const itemContainer = document.querySelector('#product-list');
const loadMore = document.querySelector('.load-more');


// Intersection Observer API for infinite scroll
const observer = new IntersectionObserver((entries) => {
    const lastItem = entries[0];
    if (lastItem.isIntersecting) {
        skip += limit;
        getItems();
        observer.unobserve(lastItem.target);
    }
}, {});

const getItems = async () => {
    loadMore.classList.remove('d-none');
    const res = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );
    let data = await res.json();
    data = data.products;
    loadMore.classList.add('d-none');
    data.forEach((item, index) => {
        const product = itemTemplate.cloneNode(true);
        product.querySelector('.card-title').innerHTML = item.title;
        product.querySelector('.card-text').innerHTML = `Price : ₹ ${item.price}`;
        product.querySelector('img').src = item.thumbnail;
        product.classList.remove('d-none');
        itemContainer.appendChild(product);

        // if last item then observe it
        if (index === data.length - 1) {
            observer.observe(product);
        }
    });
}

getItems();