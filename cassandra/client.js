exports.getSession = function (host, port) {
    var session = new Session();
    var native = org.eclipse.dirigible.api.cassandra.CassandraFacade.connect(host, port)
    session.native = native;
    return session;
};
exports.getDBResults = function ( keySpaceName, query) {
    var resultSet = new ResultSet();
    var native = org.eclipse.dirigible.api.cassandra.CassandraFacade.getResultSet(keySpaceName,query);
    resultSet.native = native;
    return resultSet;
}


/**
 * Session object
 */
function Session() {

    this.executeQuery = function (query) {
        return this.native.execute(query)
    }

    this.getLoggedKeyspaceName = function () {

        return this.native.getLoggedKeyspace();
    }

    this.closeSession = function () {
        return this.native.close();
    }
    this.getDBResult = function (keySpaceName, query) {
        var resultSet = new ResultSet();
        var native = org.eclipse.dirigible.api.cassandra.CassandraFacade.getResultSet(keySpaceName,query);
        resultSet.native = native;
        return resultSet;
    };
}

/**
 * ResultSet object
 */
function ResultSet() {
    this.getRowAsString = function () {
        var result = "";
        if (this) {
            result = this.native.all().toString();
        } else {
            result = "Result Set is empty"
            console.log(result)
        }
        return result;
    }
}

/**
 * Row object
 */
function Row() {
    this.asJson = function () {
        var result = ""
        if (this.native) {
            result = this.native.prettyJson()
        } else {
            result = "Row is empty!"
        }
        return result
    }


}