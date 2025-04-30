import React, { useState, useEffect } from 'react';
import styles from './StoriesInPhoto.module.css';
import { TextField, InputAdornment, IconButton, Chip, Box, Avatar, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import { motion, AnimatePresence } from 'framer-motion';

const StoriesInPhoto = () => {
    const [selectedStory, setSelectedStory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showShareOptions, setShowShareOptions] = useState(false);
    const [likedStories, setLikedStories] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState('');

    // Sample stories data - replace with actual data from your backend
    const stories = [
        {
            id: 1,
            title: "Community Support",
            description: "How our volunteers helped rebuild after the flood",
            image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            date: "2024-03-15",
            category: "community",
            author: {
                name: "John Doe",
                avatar: "https://i.pravatar.cc/150?img=1"
            },
            likes: 245,
            comments: [
                {
                    id: 1,
                    user: "Jane Smith",
                    avatar: "https://i.pravatar.cc/150?img=2",
                    text: "Amazing work! Keep it up!",
                    date: "2024-03-16"
                }
            ]
        },
        {
            id: 2,
            title: "Education Initiative",
            description: "Providing books and supplies to underprivileged schools",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            date: "2024-03-10",
            category: "education",
            author: {
                name: "Sarah Johnson",
                avatar: "https://i.pravatar.cc/150?img=3"
            },
            likes: 189,
            comments: []
        },
        {
            id: 3,
            title: "Health Camp",
            description: "Free medical check-ups for the community",
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            date: "2024-03-05",
            category: "health",
            author: {
                name: "Mike Wilson",
                avatar: "https://i.pravatar.cc/150?img=4"
            },
            likes: 312,
            comments: []
        }
    ];

    const categories = [
        { id: 'all', label: 'All' },
        { id: 'community', label: 'Community' },
        { id: 'education', label: 'Education' },
        { id: 'health', label: 'Health' }
    ];

    const filteredStories = stories.filter(story => {
        const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            story.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || story.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleShare = (platform) => {
        const url = window.location.href;
        const title = selectedStory.title;
        let shareUrl = '';

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
                break;
            default:
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank');
        }
        setShowShareOptions(false);
    };

    const handleLike = (storyId) => {
        setLikedStories(prev =>
            prev.includes(storyId)
                ? prev.filter(id => id !== storyId)
                : [...prev, storyId]
        );
    };

    const handleComment = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            // Here you would typically send the comment to your backend
            setComment('');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.heroSection}>
                <motion.div
                    className={styles.heroContent}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className={styles.heroTitle}>Stories in Photos</h1>
                    <p className={styles.heroSubtitle}>
                        Discover inspiring moments and impactful stories from our community.
                        Each photo tells a unique tale of hope, resilience, and positive change.
                    </p>
                    <div className={styles.heroStats}>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>1,234</span>
                            <span className={styles.statLabel}>Stories</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>5,678</span>
                            <span className={styles.statLabel}>Contributors</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>9,012</span>
                            <span className={styles.statLabel}>Likes</span>
                        </div>
                    </div>
                    <div className={styles.heroCategories}>
                        {categories.map(category => (
                            <Chip
                                key={category.id}
                                label={category.label}
                                onClick={() => setSelectedCategory(category.id)}
                                color={selectedCategory === category.id ? "primary" : "default"}
                                className={styles.categoryChip}
                            />
                        ))}
                    </div>
                </motion.div>
                <div className={styles.heroImage}>
                    <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        alt="Hero"
                    />
                </div>
            </div>

            <div className={styles.searchAndFilter}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search stories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    className={styles.searchField}
                />
            </div>

            <motion.div
                className={styles.gallery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <AnimatePresence>
                    {filteredStories.map((story) => (
                        <motion.div
                            key={story.id}
                            className={styles.storyCard}
                            onClick={() => setSelectedStory(story)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className={styles.imageContainer}>
                                <img src={story.image} alt={story.title} className={styles.image} />
                            </div>
                            <div className={styles.storyInfo}>
                                <div className={styles.authorInfo}>
                                    <Avatar src={story.author.avatar} alt={story.author.name} />
                                    <span>{story.author.name}</span>
                                </div>
                                <h3>{story.title}</h3>
                                <p>{story.description}</p>
                                <div className={styles.storyStats}>
                                    <span className={styles.date}>{story.date}</span>
                                    <div className={styles.interactions}>
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleLike(story.id);
                                            }}
                                        >
                                            {likedStories.includes(story.id) ?
                                                <FavoriteIcon color="error" /> :
                                                <FavoriteBorderIcon />
                                            }
                                        </IconButton>
                                        <span>{story.likes}</span>
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedStory(story);
                                                setShowComments(true);
                                            }}
                                        >
                                            <CommentIcon />
                                        </IconButton>
                                        <span>{story.comments.length}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {selectedStory && (
                <motion.div
                    className={styles.modal}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => {
                        setSelectedStory(null);
                        setShowComments(false);
                    }}
                >
                    <motion.div
                        className={styles.modalContent}
                        onClick={e => e.stopPropagation()}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        <button className={styles.closeButton} onClick={() => {
                            setSelectedStory(null);
                            setShowComments(false);
                        }}>×</button>
                        <div className={styles.modalLayout}>
                            <div className={styles.modalImageSection}>
                                <img src={selectedStory.image} alt={selectedStory.title} className={styles.modalImage} />
                            </div>
                            <div className={styles.modalInfo}>
                                <div className={styles.modalHeader}>
                                    <div className={styles.authorInfo}>
                                        <Avatar src={selectedStory.author.avatar} alt={selectedStory.author.name} />
                                        <div>
                                            <h4>{selectedStory.author.name}</h4>
                                            <span className={styles.date}>{selectedStory.date}</span>
                                        </div>
                                    </div>
                                    <div className={styles.shareSection}>
                                        <IconButton onClick={() => setShowShareOptions(!showShareOptions)}>
                                            <ShareIcon />
                                        </IconButton>
                                        {showShareOptions && (
                                            <motion.div
                                                className={styles.shareOptions}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <IconButton onClick={() => handleShare('facebook')}>
                                                    <FacebookIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleShare('twitter')}>
                                                    <TwitterIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleShare('linkedin')}>
                                                    <LinkedInIcon />
                                                </IconButton>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                                <h2>{selectedStory.title}</h2>
                                <p>{selectedStory.description}</p>
                                <div className={styles.interactionPanel}>
                                    <div className={styles.likeSection}>
                                        <IconButton
                                            onClick={() => handleLike(selectedStory.id)}
                                            color={likedStories.includes(selectedStory.id) ? "error" : "default"}
                                        >
                                            {likedStories.includes(selectedStory.id) ?
                                                <FavoriteIcon /> :
                                                <FavoriteBorderIcon />
                                            }
                                        </IconButton>
                                        <span>{selectedStory.likes} likes</span>
                                    </div>
                                    <div className={styles.commentSection}>
                                        <h3>Comments ({selectedStory.comments.length})</h3>
                                        <div className={styles.commentsList}>
                                            {selectedStory.comments.map(comment => (
                                                <div key={comment.id} className={styles.comment}>
                                                    <Avatar src={comment.avatar} alt={comment.user} />
                                                    <div className={styles.commentContent}>
                                                        <div className={styles.commentHeader}>
                                                            <span className={styles.commentUser}>{comment.user}</span>
                                                            <span className={styles.commentDate}>{comment.date}</span>
                                                        </div>
                                                        <p>{comment.text}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <form onSubmit={handleComment} className={styles.commentForm}>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                placeholder="Write a comment..."
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                size="small"
                                            />
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                disabled={!comment.trim()}
                                            >
                                                Post
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default StoriesInPhoto; 