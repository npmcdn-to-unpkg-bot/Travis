/**
 * Created by Arash on 23-May-16.
 */
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var heroes = [
            { "id": 2, "name": "Willy" },
            { "id": 3, "name": "Bixente" },
            { "id": 4, "name": "Lucio" },
            { "id": 5, "name": "Zizo" },
            { "id": 6, "name": "Basti" },
            { "id": 7, "name": "Beck" },
            { "id": 8, "name": "Magician" },
            { "id": 9, "name": "Mehmet" },
            { "id": 10, "name": "Ro" },
            { "id": 11, "name": "Micheal" }
        ];
        return { heroes: heroes };
    };
    return InMemoryDataService;
})();
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map