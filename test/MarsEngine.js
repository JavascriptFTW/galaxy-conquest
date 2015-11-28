var assert = require("assert");
var _ = require("underscore");

describe("Mars Engine", function() {
    
    describe("Graphs", function() {
        
        var Graph = require("../Mars/build/Graph.js");
        
        describe("general methods", function() {
            
            describe("the `on` method", function() {
                
                describe("with 2 arguments (event, callback)", function() {
                    
                    it("should exist as a method", function() {
                        
                        var graph = new Graph();
                        
                        assert.notEqual(graph.on, undefined);
                        assert.equal(typeof graph.on, "function");
                        
                    });
                    
                    it("should add event listeners when called", function() {
                        
                        var graph = new Graph();
                        
                        var listener = function() {
                            // Hi
                        };
                        
                        graph.on("test", listener);
                        
                        assert.notEqual(graph._listeners, undefined);
                        assert.notEqual(graph._listeners["test"], undefined);
                        assert.equal(graph._listeners["test"].constructor, Array);
                        assert.equal(graph._listeners["test"].length, 1);
                        assert.equal(typeof graph._listeners["test"][0], "function");
                        assert.equal(graph._listeners["test"][0].toString(), listener.toString());
                        
                    });
                    
                    it("should only accept strings as event names", function() {
                        
                        var graph = new Graph();
                        
                        var key = 2;
                        
                        graph.on(key, function() {});
                        
                        assert.equal(graph._listeners[key], undefined);
                        
                    });
                    
                    it("should only accept functions and arrays as listeners", function() {
                        
                        var graph = new Graph();
                        
                        graph.on("test", "No. Just no");
                        
                        assert.equal(graph._listeners["test"], undefined);
                        
                    });
                    
                    it("should add multiple valid listeners in an array", function() {
                        
                        var graph = new Graph();
                        
                        var fn1 = function() {
                            // Function 1
                        };
                        
                        var fn2 = function() {
                            // Function 2
                        };
                        
                        graph.on("test", fn1);
                        
                        graph.on("test", fn2);
                        
                        assert.equal(graph._listeners["test"].length, 2);
                        assert.equal(graph._listeners["test"][0].toString(), fn1.toString());
                        assert.equal(graph._listeners["test"][1].toString(), fn2.toString());
                        
                    });
                    
                    it("should accept arrays of listeners", function() {
                        
                        var graph = new Graph();
                        
                        var fn1 = function() {
                            // Function 1
                        };
                        
                        var fn2 = function() {
                            // Function 2
                        };
                        
                        graph.on("test", [fn1, fn2]);
                        
                        assert.notEqual(graph._listeners["test"], undefined);
                        assert.equal(graph._listeners["test"].length, 2);
                        assert.equal(graph._listeners["test"][0].toString(), fn1.toString());
                        assert.equal(graph._listeners["test"][1].toString(), fn2.toString());
                        
                    });
                    
                    it("should filter out invalid entries in arrays of listeners", function() {
                        
                        var graph = new Graph();
                        
                        graph.on("test", [function() {}, 2, function() {}])
                        
                        assert.equal(graph._listeners["test"].length, 2);
                        
                    });
                    
                });
                
                describe("with 1 argument (event object)", function() {
                    
                    it("should accept an JSON object with event names as keys and callbacks as values", function() {
                        
                        var graph = new Graph();
                        
                        var fn1 = function() {
                            // Function 1
                        };
                        
                        var fn2 = function() {
                            // Function 2
                        };
                        
                        var fn3 = function() {
                            // Function 3
                        };
                        
                        var fn4 = function() {
                            // Function 4
                        };
                        
                        graph.on({
                            "test1": [fn1, fn2],
                            "test2": [fn3],
                            "test3": fn4
                        });
                        
                        assert.equal(typeof graph._listeners["test1"], "object");
                        assert.equal(typeof graph._listeners["test2"], "object");
                        assert.equal(typeof graph._listeners["test3"], "object");
                        assert.equal(graph._listeners["test1"].constructor, Array);
                        assert.equal(graph._listeners["test2"].constructor, Array);
                        assert.equal(graph._listeners["test3"].constructor, Array);
                        assert.equal(graph._listeners["test1"].length, 2);
                        assert.equal(graph._listeners["test2"].length, 1);
                        assert.equal(graph._listeners["test3"].length, 1);
                        assert.equal(graph._listeners["test1"][0].toString(), fn1.toString());
                        assert.equal(graph._listeners["test1"][1].toString(), fn2.toString());
                        
                    });
                    
                });
                
            });
            
            describe("the `off` method", function() {
                
                describe("with 2 arguments (event, callback)", function() {
                    
                    it("should remove a single callback", function() {
                        
                        var graph = new Graph();
                        
                        var fn1 = function() {
                            // Function 1
                        };
                        
                        graph.on("test", fn1);
                        
                        graph.off("test", fn1);
                        
                        assert.equal(graph._listeners["test"], undefined);
                        
                    });
                    
                    it("should remove groups of callbacks", function() {
                        
                        var graph = new Graph();
                        
                        var fn1 = function() {
                            // Function 1
                        };
                        
                        var fn2 = function() {
                            // Function 2
                        };
                        
                        graph.on("test", [fn1, fn2]);
                        
                        graph.off("test", [fn2, fn1]);
                        
                        assert.equal(graph._listeners["test"], undefined);
                        
                    });
                    
                    it("should preserve existing callbacks", function() {
                        
                        var graph = new Graph();
                        
                        var fn1 = function() {
                            // Function 1
                        };
                        
                        var fn2 = function() {
                            // Function 2
                        };
                        
                        var fn3 = function() {
                            // Function 3
                        };
                        
                        graph.on("test", [fn1, fn2, fn3]);
                        
                        graph.off("test", [fn1, fn3]);
                        
                        assert.equal(typeof graph._listeners["test"], "object");
                        assert.equal(graph._listeners["test"].length, 1);
                        assert.equal(graph._listeners["test"][0], fn2.toString());
                        
                    });
                    
                });
                
                describe("with 1 argument (event object)", function() {
                    
                    it("should accept an JSON object with event names as keys and callbacks as values for removal", function() {
                        
                        var graph = new Graph();
                        
                        var fn1 = function() {
                            // Function 1
                        };
                        
                        var fn2 = function() {
                            // Function 2
                        };
                        
                        var fn3 = function() {
                            // Function 3
                        };
                        
                        var fn4 = function() {
                            // Function 4
                        };
                        
                        graph.on({
                            "test1": [fn1, fn2],
                            "test2": [fn3],
                            "test3": fn4
                        });
                        
                        graph.off({
                            "test1": fn2,
                            "test3": [fn4]
                        });
                        
                        assert.equal(graph._listeners["test3"], undefined);
                        assert.equal(graph._listeners["test1"].length, 1);
                        assert.equal(graph._listeners["test1"][0].toString(), fn1.toString());
                        
                    });
                    
                });
                
            });
            
            describe("fire", function() {
                
                it("should fire an event", function() {
                    
                    var graph = new Graph();
                    
                    var fired = false;
                    
                    graph.on("test", function() {
                        fired = true;
                    });
                    
                    graph.fire("test");
                    
                    assert.equal(fired, true);
                    
                });
                
                it("should fire an event with data", function() {
                    
                    var graph = new Graph();
                    
                    graph.on("test", function(data) {
                        data.theAnswer = 42;    
                    });
                    
                    var evtData = {};
                    
                    graph.fire("test", evtData);
                    
                    assert.equal(evtData.theAnswer, 42);
                    
                });
                
                it("should fire multiple events with data", function() {
                    
                    var graph = new Graph();
                    
                    graph.on("test1", function(data) {
                        data.calls += 1;
                    });
                    
                    graph.on("test2", function(data) {
                        data.calls += 1;
                    });
                    
                    graph.on("test3", function(data) {
                        data.calls += 1;
                    });
                    
                    var evtData = {
                        calls: 0
                    };
                    
                    graph.fire(["test1", "test2", "test3"], evtData);
                    
                    assert.equal(evtData.calls, 3);
                    
                });
                
                it("should be able to use a JSON object to fire multiple events with data", function() {
                    
                    var graph = new Graph();
                    
                    graph.on("test1", function(data) {
                        data.theAnswer = 42;
                    });
                    
                    graph.on("test2", function(data) {
                        data.theQuestion = "?";
                    });
                    
                    graph.on("test3", function(data) {
                        data.foo = "bar";
                    });
                    
                    var data1 = {}, data2 = {}, data3 = {};
                    
                    graph.fire({
                        "test1": data1,
                        "test2": data2,
                        "test3": data3
                    });
                    
                    assert.equal(data1.theAnswer, 42);
                    assert.equal(data2.theQuestion, "?");
                    assert.equal(data3.foo, "bar");
                    
                });
                
            });
            
            describe("data", function() {
                
                it("should accept simple key-value pairs", function() {
                    
                    var graph = new Graph();
                    
                    graph.data("test", 42);
                    
                    assert.equal(graph._data["test"], 42);
                    
                });
                
                it("should accept complex key-value pairs", function() {
                    
                    var graph = new Graph();
                    
                    graph.data("top-test", {});
                    
                    graph.data("top-test.test", 2);
                    
                    assert.notEqual(graph._data["top-test"], undefined);
                    assert.equal(graph._data["top-test"]["test"], 2);
                    
                });
                
                it("should accept JSON data replacement structures", function() {
                    
                    var graph = new Graph();
                    
                    graph.data({
                        foo: "bar",
                        baz: {
                            theAnswer: 42
                        }
                    });
                    
                    assert.equal(graph._data["foo"], "bar");
                    assert.notEqual(graph._data["baz"], undefined);
                    assert.equal(graph._data["baz"]["theAnswer"], 42);
                    
                });
                
                it("should overwrite existing data", function() {
                    
                    var graph = new Graph();
                    
                    graph.data({
                        foo: "bar",
                        baz: {
                            theAnswer: 42,
                            theQuestion: "?"
                        }
                    });
                    
                    graph.data("baz.theQuestion", "What is this?");
                    graph.data({
                        foo: "baz",
                        baz: {
                            theAnswer: "Trollololol"
                        }
                    });
                    
                    assert.equal(graph._data["baz"]["theQuestion"], "What is this?");
                    assert.equal(graph._data["foo"], "baz");
                    assert.equal(graph._data["baz"]["theAnswer"], "Trollololol");
                    
                });
                
            });
            
        });
        
        describe("Node", function() {
            
            
            
        });
        
        describe("Connection", function() {
            
            
            
        });
        
    });
    
});
