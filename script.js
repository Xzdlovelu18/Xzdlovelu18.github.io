// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const mobileMenu = document.getElementById('mobile-menu');
    const navbarNav = document.querySelector('.navbar-nav');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 移动端菜单切换事件
    mobileMenu.addEventListener('click', function() {
        navbarNav.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // 汉堡菜单动画
        const bars = document.querySelectorAll('.bar');
        bars[0].classList.toggle('transform', bars[0].classList.contains('transform') ? false : true);
        bars[1].classList.toggle('opacity-0', bars[1].classList.contains('opacity-0') ? false : true);
        bars[2].classList.toggle('transform', bars[2].classList.contains('transform') ? false : true);
    });
    
    // 点击导航链接关闭菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarNav.classList.remove('active');
            mobileMenu.classList.remove('active');
            
            // 重置汉堡菜单
            const bars = document.querySelectorAll('.bar');
            bars[0].classList.remove('transform');
            bars[1].classList.remove('opacity-0');
            bars[2].classList.remove('transform');
        });
    });
    
    // 滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 滚动动画
        animateOnScroll();
    });
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // 考虑导航栏高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 滚动动画函数
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in-up');
            }
        });
    }
    
    // 技能条动画
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    }
    
    // 监听技能部分进入视口
    const skillsSection = document.getElementById('skills');
    const observerOptions = {
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // 页面加载时执行一次动画检查
    animateOnScroll();
    
    // 添加滚动进度指示器
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background-color: var(--primary-color);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // 添加鼠标悬停效果到社交链接
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 添加数字增长动画
    function animateNumbers() {
        const numberElements = document.querySelectorAll('.stat-number');
        
        numberElements.forEach(element => {
            const target = parseInt(element.textContent);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    element.textContent = target + (element.textContent.includes('+') ? '+' : '');
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
                }
            }, 16);
        });
    }
    
    // 监听数字部分进入视口
    const aboutSection = document.getElementById('about');
    
    const numberObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                numberObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (aboutSection) {
        numberObserver.observe(aboutSection);
    }
});

// 添加CSS动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes transform {
        0% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(45deg);
        }
        100% {
            transform: rotate(45deg);
        }
    }
    
    @keyframes transform-reverse {
        0% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(-45deg);
        }
        100% {
            transform: rotate(-45deg);
        }
    }
    
    .bar.transform:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .bar.transform:nth-child(2) {
        opacity: 0;
    }
    
    .bar.transform:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
    }
    
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.fade-in-up {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);