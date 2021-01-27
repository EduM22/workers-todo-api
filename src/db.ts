import faunadb, { query as q } from "faunadb"

let client = new faunadb.Client({ secret: '<key>', fetch: fetch.bind(globalThis) })

class Todo {
    private collection: string = 'todos'
    constructor() {}

    create(data: any) : Promise<any> {
        return client.query(
            q.Create(
                q.Collection(this.collection),
                { data: data }
            )
        )
    }
    
    read(id: string) : Promise<any> {
        return client.query(
            q.Get(q.Ref(q.Collection(this.collection), id))
        )
    }
    
    update(data: any, id: string) : Promise<any> {
        return client.query(
            q.Update(
                q.Ref(q.Collection(this.collection), id),
                { data: data }
            )
        )
    }
    
    delete(id: string) : Promise<any> {
        return client.query(
            q.Delete(
                q.Ref(q.Collection(this.collection), id)
            )
        )
    }

}

export let todo = new Todo()