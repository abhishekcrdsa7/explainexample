import React from "react";
import {Helmet} from "react-helmet";

function NoIndex() {
    return (
        <div>
            <Helmet>
                <meta name="robots" content="noindex"/>
                <meta name="title" content="do not index this page"/>
                <meta name="description" content="This page should not be indexed as it has been permanently removed"/>
            </Helmet>
        </div>
    );
}

export default NoIndex;
