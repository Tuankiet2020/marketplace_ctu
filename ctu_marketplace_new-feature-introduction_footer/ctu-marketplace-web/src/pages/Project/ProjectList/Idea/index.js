/* eslint-disable no-restricted-globals */

import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import { retrieveIdeaProjects } from "../../../../store/projectSlice";

import Projects from '../Component/Projects';

import { useState } from 'react';
import { SEO_PROJECTS } from '../../../../libs/constants-seo';
import { seo } from '../../../../libs/helper';
import _ from 'lodash';

const ProjectList = (props) => {

    const [projects, setProjects] = useState([]);
    const [filteredFields, setFilteredFields] = useState(props.location.state?.projectField ? [props.location.state.projectField] : null);
    const [isFilterOneField, setIsFilterOneField] = useState(props.location.state?.projectField ?? false);

    const dispatch = useDispatch();
    const projectFieldSelector = useSelector(state => state.filterProjectField)

    useEffect(() => {
        seo({
            title: SEO_PROJECTS.idea.title,
            metaDescription: SEO_PROJECTS.idea.metaDescription
        });

        dispatch(retrieveIdeaProjects())
        .then(response => {
            setProjects(response.payload)
        })
    // eslint-disable-next-line
    }, [])

    const renderList = () => {
        if(props.projects){
            let filteredProjects = [];
            if(filteredFields && filteredFields.length > 0){
                if(filteredFields[0].name === "Commercial-Projects" || filteredFields[0].name === "Researching-Projects" || filteredFields[0].name === "Idea-Projects"){
                    setFilteredFields([]);
                }

                if(isFilterOneField && projectFieldSelector?.id?.toString() !== filteredFields[0]?.id?.toString()){
                    setFilteredFields([projectFieldSelector])
                }
                projects.forEach(project => {
                    project.projectFieldList.forEach(field => {
                        if(filteredFields.some(checkedField => field.field?.id === checkedField.id)){
                            filteredProjects = _.unionWith(filteredProjects, [project], _.isEqual)
                        }
                    })
                });
            }
            
            return (
                <Projects 
                    projects={filteredFields && filteredFields.length > 0 ? filteredProjects : projects} 
                    projectType='idea' 
                    filteredFields={filteredFields} 
                    setFilteredFields={setFilteredFields}
                    setIsFilterOneField={setIsFilterOneField}
                />
            )
        }
        return null
    }

    return (
        <>
            { renderList() }
        </>
    )
}

const mapStateToProps = (state) => {
    return { 
        projects:  Object.values(state.projects.data),
    };
}

export default connect(
    mapStateToProps, 
    {}
)(ProjectList);