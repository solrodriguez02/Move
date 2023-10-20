class resultQueryInfo{
    constructor(categoryId, userId, difficulty, score, search, page, size, orderBy, date, direction){
        this.categoryId = categoryId; 
        this.userId = userId; 
        this.difficulty = difficulty; 
        this.score = score; 
        this.search = search; 
        this.page = page; 
        this.size = size; 
        this.orderBy = orderBy; 
        this.date = date; 
        this.direction = direction;
    }
}

export {resultQueryInfo}