import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import screw from '../img/screwBulletSmall.png';
import prev from '../img/lightbox-btn-prev.gif';
import next from '../img/lightbox-btn-next.gif';
import close from '../img/lightbox-btn-close.gif';

import { GalleryImages as images, masterArray } from './GalleryImages';

import { Modal } from './Modal';

export const Gallery = () => {

    const [active, setActive] = useState(false);
    const [id, setId] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const [arrayIndex, setArrayIndex] = useState(0);

    const containerRef = useRef(null);

    // could do with fallback for if masterArray is empty & use placeholder somewhere here

    const ShowComparisons = (e) => { // opens comparisons box
        setActive(true);
        if(e.target.id && e.target.id !== id) { // does the clicked container have an ID and is it a different one to previous click?
            setId(e.target.id); // grabs the id for render to know which index is the object that contains the specific before/afters
            console.log(id);

        } else if(!e.target.id) { // if there is no id
            console.log("no id on this image!");
        };
    };

    useEffect(() => {
        if(active) {
            containerRef.current.focus(); // sets focus on comparisons box
        };
    }, [active, id]);

    const ToggleModal = (e) => {
        // searches masterArray to find object with matching id as clicked container and saves it
        setArrayIndex(masterArray.findIndex((element) => element.id === e.target.id));
        setShowModal(!showModal);
    };

    const CycleImage = (direction) => {

        if(direction === "left") {
            if(arrayIndex === 0) {
                setArrayIndex(masterArray.length - 1);
            } else {
                setArrayIndex(arrayIndex - 1);
            };
        } else {
            if(arrayIndex === masterArray.length - 1) {
                setArrayIndex(0);
            } else {
                setArrayIndex(arrayIndex + 1);
            };
        };
    };

    return (
        <StyledMain>
            <MainContent>
                <List>
                    <ListItem>Extensions</ListItem>
                    <ListItem>Property Repairs</ListItem>
                    <ListItem>Conversions</ListItem>
                    <ListItem>External Works</ListItem>
                    <ListItem>Business premises maintained</ListItem>
                </List>
                {active &&
                    <Comparisons ref={containerRef} tabIndex={-1}>
                        <ComparisonContainer>
                            <Span>Before</Span>
                            {images[id].before.map(image =>
                                <OpenModalButton id={image.id} key={image.id} onClick={ToggleModal}>
                                    <ComparisonImage 
                                        src={image.thumb}
                                        alt="Genuine Builders York"
                                    />
                                </OpenModalButton>
                            )}
                        </ComparisonContainer>
                        <ComparisonContainer>
                            <Span>After</Span>
                            {images[id].after.map(image =>
                                <OpenModalButton id={image.id} key={image.id} onClick={ToggleModal}>
                                    <ComparisonImage 
                                        src={image.thumb}
                                        alt="Genuine Builders York"
                                    />
                                </OpenModalButton>
                            )}
                        </ComparisonContainer>
                    </Comparisons>
                }
                <Grid>
                    {images.map(image => 
                        <Button 
                            onClick={ShowComparisons} 
                            id={image.id ? image.id : ""}
                            key={image.id ? image.id : ""}
                        >
                            <Image src={image.thumb} alt="Genuine Builders York"/>
                        </Button>
                    )}
                </Grid>
                {showModal && 
                    <Modal>
                        <ModalOverlay>
                            <ModalDiv>
                                <ModalImage>
                                    <Image src={masterArray[arrayIndex].src} alt=""/>

                                    <ModalButton left onClick={() => CycleImage("left")}><img src={prev} alt="left"/></ModalButton>
                                    <ModalButton right onClick={() => CycleImage("right")}><img src={next} alt="right"/></ModalButton>
                                </ModalImage>
                                <ModalInfo>
                                    <span>Image {arrayIndex + 1} of {masterArray.length}</span>
                                    <ModalClose onClick={ToggleModal}>
                                        <Image src={close} alt="Genuine Builders York"/>
                                    </ModalClose>
                                </ModalInfo>
                            </ModalDiv>
                        </ModalOverlay>
                    </Modal>
                }
            </MainContent>
        </StyledMain>
    );
};

const StyledMain = styled.main`
    margin: 1em;
`;

const MainContent = styled.div`
    max-width: 780px;
    margin: 2em auto;
    padding: 1em;
    background-color: #2a3035;
    border-radius: 10px;
    box-shadow: 5px 5px 5px #333333;

    @media only screen and (max-width: 560px) {
        padding: 1em;
    }
`;

const List = styled.ul`
    list-style-type: none;
    margin: 0 auto;
    margin-bottom: 1em;
    padding: 0;
    max-width: 39ex;
    text-align: center;

    @media only screen and (max-width: 768px) {
        display: none;
    }
`;

const ListItem = styled.li`
    display: inline;
    color: #a0df6d;
    font-size: small;

    &:before {
        margin: 1ex;
        content: url(${screw});
    }

    &:nth-child(odd) {
        color: #52af07;
    }

    &:nth-child(3):after {
        margin: 1ex;
        content: url(${screw});
    }

    &:nth-child(5):after {
        margin: 1ex;
        content: url(${screw});
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1em;

    @media only screen and (max-width: 560px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const Button = styled.button`
    cursor: pointer;
    padding: 1em;
    background-color: #475159;
    border-style: none;
`;

const Image = styled.img`
    vertical-align: middle;
    width: 100%;
    pointer-events: none;
`;

const Comparisons = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 1em;
    padding: 1em;
    background-color: #475159;
`;

const ComparisonContainer = styled.div`
    text-align: center;

    &:nth-child(2) {
        @media only screen and (max-width: 560px) {
            margin-left: 1em;
        }
    }
`;

const Span = styled.span`
    color: #a0df6d;
`;

const OpenModalButton = styled(Button)`
    display: block;
    padding: 0em;
`;

const ComparisonImage = styled(Image)`
    margin: 0.5em 0em;
    pointer-events: none;
`;

const ModalOverlay = styled.div`
    position: fixed;
    background-color: rgb(0,0,0,0.8);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 4;
`;

const ModalDiv = styled.div`
    position: fixed;
    background-color: white;
    padding: 1em;
    text-align: center;
    margin: auto;
    left: 33%;
    right: 33%;
    top: 20%;

    @media only screen and (max-width: 768px) {
        left: 20%;
        right: 20%;
    }

    @media only screen and (max-width: 560px) {
        left: 0;
        width: 100%;
    }
`;

const ModalImage = styled.div`
    position: relative;
`;

const ModalButton = styled.button`
    cursor: pointer;
    background-color: transparent;
    color: black;
    border-style: none;
    text-transform: uppercase;
    position: absolute;
    width: 50%;
    height: 100%;
    padding: 0;

    ${props => props.left ? "left: 0%" : "right: 0%"};

    img {
        opacity: 0;
        position: absolute;
        top: 15%;
        ${props => props.left ? "left: -2.5%" : "right: -2.5%"};

        @media only screen and (max-width: 768px) {
            opacity: 1;
        }
    }

    &:hover img {
        opacity: 100%;
    }
`;

const ModalInfo = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 0.5em;
`;

const ModalClose = styled.button`
    cursor: pointer;
    padding: 0;
    border: none;
    text-decoration: none;
`;