import Environment from "../Environment"

class Paginator {
  public page: number
  public take: number

  constructor(page: number, take: number) {
    this.page = Paginator.sanitizePage(page)
    this.take = Paginator.sanitizeTake(take)
  }

  public paginate() {
    return {
      skip: (this.page - 1) * this.take,
      take: this.take
    }
  }

  private static sanitizePage(page: any) {
    const pageNumber = Number(page)

    if (Number.isNaN(pageNumber)) return 1
    if (pageNumber < 1) return 1
    return page
  }

  private static sanitizeTake(take: any) {
    const takeNumber = Number(take)

    if (Number.isNaN(takeNumber)) return Environment.PAGINATE_BY
    if (takeNumber < 1) return Environment.PAGINATE_BY
    return takeNumber
  }
}

export default Paginator
