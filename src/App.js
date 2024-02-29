import React, { Component } from "react";
import Navbar from "./components/navbar";
import News from "./components/news";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
    pageSize = this.pageSize;

    state = {
        progress: 0,
    };
    
    setProgress = (progress) => {
        this.setState({ progress: progress });
    };

    render() {
        return (
            <>
                <Router>
                    <Navbar />
                    <LoadingBar
                        color="#f11946"
                        progress={this.state.progress}
                    />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <News
                                    setProgress={this.setProgress}
                                    key="general"
                                    pageSize={this.pageSize}
                                />
                            }
                        />

                        <Route
                            path="/science"
                            element={
                                <News
                                    setProgress={this.setProgress}
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
                                    setProgress={this.setProgress}
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
                                    setProgress={this.setProgress}
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
                                    setProgress={this.setProgress}
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
                                    setProgress={this.setProgress}
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
                                    setProgress={this.setProgress}
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
