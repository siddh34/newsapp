import React, { Component } from "react";
import Navbar from "./components/navbar";
import News from "./components/news";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

export default class App extends Component {
    pageSize = this.pageSize;
    render() {
        return (
            <>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route
                            path="/"
                            element={<News key="general" pageSize={this.pageSize} />}
                        />

                        <Route
                            path="/science"
                            element={
                                <News
                                    key="science"
                                    pageSize={this.pageSize}
                                    country={"in"}
                                    category={"science"}
                                />
                            }
                        />

                        <Route
                            path="/business"
                            element={
                                <News
                                    key="business"
                                    pageSize={this.pageSize}
                                    country={"in"}
                                    category={"business"}
                                />
                            }
                        />

                        <Route
                            path="/sports"
                            element={
                                <News
                                    key="sports"
                                    pageSize={this.pageSize}
                                    country={"in"}
                                    category={"sports"}
                                />
                            }
                        />

                        <Route
                            path="/health"
                            element={
                                <News
                                    key="health"
                                    pageSize={this.pageSize}
                                    country={"in"}
                                    category={"health"}
                                />
                            }
                        />

                        <Route
                            path="/entertainment"
                            element={
                                <News
                                    key="entertainment"
                                    pageSize={this.pageSize}
                                    country={"in"}
                                    category={"entertainment"}
                                />
                            }
                        />

                        <Route
                            path="/technology"
                            element={
                                <News
                                    key="technology"
                                    pageSize={this.pageSize}
                                    country={"in"}
                                    category={"technology"}
                                />
                            }
                        />
                    </Routes>
                </Router>
            </>
        );
    }
}
