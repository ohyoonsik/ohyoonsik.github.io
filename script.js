// 상품 데이터 배열
const products = [
  {
    id: 1,
    name: "상품 1",
    price: 129000
  },

  {
    id: 2,
    name: "상품 2",
    price: 89000
  },

  {
    id: 3,
    name: "상품 3",
    price: 159000
  },

  {
    id: 4,
    name: "상품 4",
    price: 49000
  },

  {
    id: 5,
    name: "상품 5",
    price: 219000
  },

  {
    id: 6,
    name: "상품 6",
    price: 99000
  }
];

// HTML 요소 가져오기
const productGrid = document.getElementById("productGrid");
const sortSelect = document.getElementById("sortSelect");
const searchInput = document.getElementById("searchInput");


// 상품 목록 출력 함수
function renderProducts() {

  // 배열 복사
  let sortedProducts = [...products];

  // 검색어 가져오기
  const searchText = searchInput.value.toLowerCase();

  // 검색 필터
  sortedProducts = sortedProducts.filter((product) => {
    return product.name.toLowerCase().includes(searchText);
  });

  // 정렬 값 가져오기
  const sortValue = sortSelect.value;

  // 낮은 가격순
  if (sortValue === "low") {

    sortedProducts.sort((a, b) => {
      return a.price - b.price;
    });

  }

  // 높은 가격순
  else if (sortValue === "high") {

    sortedProducts.sort((a, b) => {
      return b.price - a.price;
    });

  }

  // 기존 상품 목록 비우기
  productGrid.innerHTML = "";

  // 상품 카드 생성
  sortedProducts.forEach((product) => {

    // article 태그 생성
    const card = document.createElement("article");

    // 클래스 추가
    card.className = "product-card";

    // 카드 내용 추가
    card.innerHTML = `
    
        <div class="image-box">
            IMAGE
        </div>

        <div class="product-content">

            <h3>${product.name}</h3>

            <p>
                ₩${product.price.toLocaleString()}
            </p>

            <button class="product-btn">
                상품 보기
            </button>

            <button class="product-cart">
                장바구니 추가
            </button>

        </div>

    `;

    // 화면에 카드 추가
    productGrid.appendChild(card);

    const button = card.querySelector(".product-btn");

    button.addEventListener("click", () => {
        alert("준비중인 상품입니다.");
    })

  });

}

// select 값 변경 시 다시 출력
sortSelect.addEventListener("change", renderProducts);

searchInput.addEventListener("input", renderProducts);

// 처음 페이지 실행 시 상품 출력
renderProducts();
