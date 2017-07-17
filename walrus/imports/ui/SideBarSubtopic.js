import React from 'react';
import { Link } from 'react-router-dom';

const SideBarSubtopic = (props) => {
    const topicUrl = "/topics/" + props.id;
    return (
        <blockquote className="blockquote subtopic">
            <div className = "capitalise-text"><Link to={topicUrl}>{props.title}</Link></div>
        </blockquote>
    )
}

export default SideBarSubtopic;
