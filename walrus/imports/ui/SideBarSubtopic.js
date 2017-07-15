import React from 'react';
import { Link } from 'react-router-dom';

const SideBarSubtopic = (props) => {
    const topicUrl = "/topics/" + props.id;
    return (
        <blockquote className="blockquote subtopic">
            <Link to={topicUrl}>{props.title}</Link>
        </blockquote>
    )
}

export default SideBarSubtopic;
