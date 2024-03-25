import { APIConstants } from "../constants/Config";

class Proxy {
    name: any;
    schema: any;

    public Paths: any = {
        load: "/api",
        insert: "/api",
        delete: "/api",
        edit: "/api"
    };

    constructor(props) {
        this.name = props.name;
        this.schema = props.schema;
        if (props.Paths) this.Paths = props.Paths;
    }

    getUploadUrl() {
        let url = APIConstants.API_ROOT_URL;
        url = url.replace(/\/$/, '');
        url += "/api";
        return `${url}/upload/data`;
    }

    detectFinder(filter) {
        if (filter.finder) return filter.finder;

        const res = Object.keys(filter).reduce(function(pre, cur) {
            if (
                cur == "tab" ||
                cur == "object" ||
                cur == "finder" ||
                cur == "action" ||
                cur == "parent" ||
                cur == "entityPath" ||
                cur == "path" ||
                cur == "id" ||
                cur == "query"
            )
                return pre;

            return cur;
        }, "");
        return { name: res, value: filter[res] };
    }

    /*
    getFilterAsNV(filter)
    {
     let res = Object.keys(filter).reduce(function (pre, cur) {
     if (cur == 'object' || cur == 'action') return pre;
     if (filter[cur])
     return `${pre}&${cur}=${filter[cur]}`;
     else
     {
     return pre;
     }

     }, '');
     return res
     }*/

    constructGenericUrl(url, filter, current) {
        if (current && filter && filter.for && filter.for.id) {
            current = current[filter.for.id];
        }
        let page = 0;
        if (current) {
            page = current.page.number + 1;
            if (current.page.totalPages == page) return null;
        }

        let finderPath = "";
        let finderQuery = "";
        const finder = this.detectFinder(filter);

        if (finder.value) {
            finderPath = `/${finder.name}`;
            finderQuery = `&${finder.name}=${finder.value}`;
        }
        url = url.replace(/\/$/, '');

        return `${url}${finderPath}?${finderQuery}&page=${page}`;
    }

    url(
        id,
        filter = {
            entityPath: null,
            path: null,
            parent: null,
            action: null,
            id: null
        },
        type
    ) {
        if (!filter.entityPath) filter.entityPath = this.getEntitiesPath();
        let url = "";
        if (!type) {
            
            url = APIConstants.API_ROOT_URL ;
            url = url.replace(/\/$/, '');
            url += "/api";

        } else {
            url = APIConstants.API_ROOT_URL;
            url = url.replace(/\/$/, '');
            url += this.Paths[type];
        }
        console.log(url);
        // Full Path
        if (filter.path) {
            url = url.replace(/\/$/, '');
            return `${url}/${filter.path}`;
        }
        // Parent
        const parent: any = filter.parent;
        if (parent && filter.entityPath != parent) {
            url = url.replace(/\/$/, '');
            if (!parent.startsWith("/")){
                url = `${url}/${parent}`;
            } else{
                url = `${url}${parent}`;
            }
        }

        // Entity
        if (!parent || !parent.includes(`${filter.entityPath}`)) {
            url = url.replace(/\/$/, '');
            url = `${url}/${filter.entityPath}`;
            if (id) {
                url = url.replace(/\/$/, '');
                url = `${url}/${id}`;
            } else if (filter && filter.id) {
                url = url.replace(/\/$/, '');
                url = `${url}/${filter.id}`;
            }
        }

        // Action
        if (filter.action) {
            url = url.replace(/\/$/, '');
            url = `${url}/${filter.action}`;
        }
        url = url.replace(/\/\/$/, '/');
        return url;
    }

    getNextUrl(data, playlist, filter) {
        const activePlaylist = data ? data[playlist] : null;
        if (
            !activePlaylist ||
            activePlaylist.nextUrl === false ||
            activePlaylist.nextUrl == null
        ) {
            if (filter == null) filter = {};
            const url = this.url(null, filter, "load");
            return this.constructGenericUrl(url, filter, activePlaylist);
        }
        return activePlaylist.nextUrl;
    }

    addUrl(id, filter) {
        return this.url(id, filter, "insert");
    }

    getName() {
        return this.name.toUpperCase();
    }

    getActionAppender() {
        return this.schema.getKey().toUpperCase();
    }

    getEntityName() {
        return this.name;
    }

    getEntitiesPath() {
        return this.getEntitiesName();
    }

    getEntitiesName() {
        if (!this.schema) return ""; // test only

        return this.schema.getKey();
    }

    getCollection(json: any, modelClass) {
        let coll : any[]= [];

        // Collection Returned
        if (json._embedded) {
            const src = json._embedded;
            /*
                        if (src[this.name])
                            coll = src[this.name];
            */
            /*
                        else if (src[this.getEntitiesName()])
                            coll = src[this.getEntitiesName()];
            */
            if (src.genericResources) {
                coll = src.genericResources;
            } // CAtch all for Discriminator type returns (Ex  org/1//suborgs , return orgSchool Instead of organizatios)
            else {
                const keys = Object.keys(src);
                coll = src[keys[0]];
            }
        } else {
            // Array Returned;
            if (Array.isArray(json)) {
                return json;
            }

            // object Returned
            if (!json.page) {
                coll.push(json);
            }
            // No Results
            else if (json.page && json.page.totalElements === 0) return [];
        }

        // Add Model Functions
        if (modelClass) {
            const objectColl = coll.map(item => {
                return new modelClass(item);
            });
            return objectColl;
        }
        return coll;
    }

    getSchema() {
        return this.schema;
    }
}

export default Proxy;
